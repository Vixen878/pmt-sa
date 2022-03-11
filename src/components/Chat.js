import React from 'react';
import { useState, useEffect } from "react";

import { UseCollection } from "../hooks/useCollection";

import { UseAuthContext } from "../hooks/useAuthContext"

import { collection, onSnapshot, query, addDoc, Timestamp, orderBy } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from "../firebase/config";

import Message from "../components/Message";
import MessageForm from "../components/MessageForm";

export default function Chat({ id, project }) {

    const { documents } = UseCollection('messages')

    const [text, setText] = useState("")
    const [file, setFile] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [messages, setMessages] = useState([])

    const { user } = UseAuthContext()
    const user1 = user.uid

    useEffect(() => {
        if (id == null) {
            return;
        }

        // user index
        var amID = []
        for (var i = 0; i < documents?.length; i++) {
            amID.push(documents[i].Acid)
        }

        // get messages
        const msgsRef = collection(db, 'messages', id, 'chat')
        const q = query(msgsRef, orderBy('createdAt', 'asc'))

        const unsubscribe = onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach(d => {
                msgs.push(d.data())
            })
            setMessages(msgs)
        })
        return () => {
            unsubscribe()
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        // user index
        var cID = []
        for (var i = 0; i < documents.length; i++) {
            cID.push(documents[i].Acid)
        }

        const user2 = cID

        let url;
        if (file) {
            const fileRef = ref(storage, `chatFiles/${new Date().getTime()} - ${file.name}`)
            const snap = await uploadBytes(fileRef, file)
            const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
            url = downloadUrl
        }

        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || ""
        })
        setText("")
    }

    return (
        <div className='rounded-lg border px-2 m-2 h-full'>
            <div className="font-semibold h-full w-full relative">
                <div className="absolute pb-7 bottom-0 flex flex-col-reverse h-[95%] w-full">
                    <MessageForm
                        handleSubmit={handleSubmit}
                        text={text}
                        setText={setText}
                        setFile={setFile}
                        project={project} />
                    <div className="overflow-y-auto text-sm border-b-2">
                        {messages.length ? messages?.filter(m => m.text.toLowerCase().includes(searchTerm.toLowerCase())).map((msg, i) => <Message key={i} msg={msg} user1={user1} />) : null}
                    </div>
                    <div className='flex-1'></div>
                    <form className="flex bg-primaryGreen bg-opacity-10 rounded-xl">
                        <input type="text" className="bg-gray-100 rounded-l-xl bg-opacity-20 px-4 py-2 w-full h-11"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search messages..." />
                        <button className="flex items-center justify-center px-4">
                            <svg className="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
