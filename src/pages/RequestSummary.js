// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MessageForm from "../components/MessageForm";
import { UseAuthContext } from "../hooks/useAuthContext"
import { UseDocument } from '../hooks/useDocument';
import { useHistory } from "react-router-dom";

import { collection, doc, setDoc, onSnapshot, query, addDoc, Timestamp, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from "../firebase/config";

import Message from "../components/Message";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';

import { UseFirestore } from '../hooks/useFirestore';
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebase/config";

export default function RequestSummary({ request }) {

    const { id } = useParams()
    const { document, error } = UseDocument("requests", id);

    const { user } = UseAuthContext()
    const user1 = user.uid

    const [chat, setChat] = useState("")

    // Messages
    const [text, setText] = useState("")
    const [file, setFile] = useState("")
    const [messages, setMessages] = useState([])

    // Handling when message is sent
    const handleSubmit = async (e) => {
        e.preventDefault()

        // creates an id with client id + account manager id
        const user2 = chat.createdBy.id
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

        // getting uploaded media url
        let url;
        if (file) {
            const fileRef = ref(storage, `chatFiles/${new Date().getTime()} - ${file.name}`)
            const snap = await uploadBytes(fileRef, file)
            const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
            url = downloadUrl
        }

        // Adding message to "Messages" document
        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || ""
        })
        setText("")
    }

    // Clicking on client to open chat
    const selectClient = async (docs) => {
        setChat(docs)

        const user2 = docs.createdBy.id
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

        const msgsRef = collection(db, 'messages', id, 'chat')
        const q = query(msgsRef, orderBy('createdAt', 'asc'))

        const addAccountManagerId = {
            Acid: user1,
            Cid: user2
        }

        await setDoc(doc(db, "messages", id), {
            ...addAccountManagerId
        })

        onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach(d => {
                msgs.push(d.data())
            })
            setMessages(msgs)
        })
    }

    // Display Categories
    var categories = []
    for (var i = 0; i < request.category.length; i++) {
        categories.push(request.category[i].value.Category);
    }
    console.log(request.category)

    // Approving Request
    let history = useHistory()

    const approveRequest = async (e) => {
        e.preventDefault();

        await setDoc(doc(db, "projects", id), {
            ...document,
            cid: user.uid,
            id
        })

        await updateDoc(doc(db, "requests", id), {
            isApproved: true
        })

        await setDoc(doc(db, "boards", id), {
            Acid: user.uid,
            cid: document.uid
        })

        let columnId = uuidv4()
        await setDoc(doc(db, "boards", id, "columns", columnId), {
            id: columnId,
            title: "To-Do"
        })

        history.push(`/project/${document.id}`)

        console.log("Summary Id", id)

    }

    return (
        <div className="h-screen flex px-11 pt-24">
            <div className="w-1/2 p-5">
                <div>
                    <span className="text-4xl text-gray-700 font-bold">{request.name}</span>
                </div>
                <div className="mt-1 flex-col flex">
                    <span className="text-gray-400 space-x-2 text-sm">Project Category: {categories.join(", ")}</span>
                    <span className="text-gray-400 space-x-2 text-sm">Requested on: {request.createdAt.toDate().toDateString()}</span>
                </div>
                <a href={request.BriefUrl}>
                    <div className="flex mt-5 space-x-2 rounded border bg-primaryGreen w-48 h-10 items-center pl-3 hover:bg-green-900">
                        <div className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="text-base font-semibold text-white">Download Brief</span>
                    </div>
                </a>
                <div className="mt-7 w-full flex flex-col">
                    <span className="text-xl font-semibold text-gray-700">
                        Additional Details
                    </span>
                    <span className="text-lg mt-1 text-gray-500">
                        {request.description}
                    </span>
                    <div className="mt-7 flex flex-col">
                        <span className="text-xl font-semibold text-gray-700">
                            Requested By
                        </span>
                        <div onClick={() => selectClient(document)} className="mt-3 cursor-pointer">Client: {request.createdBy.displayName}</div>
                    </div>
                    <div className="mt-10 flex space-x-4">
                        <span className="rounded border border-red-400 p-3 hover:bg-red-600 hover:text-white cursor-pointer font-semibold">
                            Decline
                        </span>
                        <span className="rounded border p-3 bg-primaryGreen font-semibold text-white hover:bg-green-700 cursor-pointer">
                            <div onClick={approveRequest}>
                                Approve Project
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex justify-center text-xl w-1/2 p-5 rounded-lg border">
                {chat ?
                    (
                        <div className="font-semibold h-screen w-full">

                            <div class="flex items-center space-x-4">
                                <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
                                <div class="flex flex-col leading-tight">
                                    <div class="text-2xl mt-1 flex items-center">
                                        <span class="text-gray-700 mr-3">{chat.createdBy.displayName}</span>
                                        <span class="text-green-500">
                                            <svg width="10" height="10">
                                                <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                                            </svg>
                                        </span>
                                    </div>
                                    <span class="text-lg text-gray-600">Client</span>
                                </div>
                            </div>
                            {/* <div className="flex items-center space-x-5">
                                <div className="w-11 h-11 bg-gray-600 rounded-full">
                                </div>
                                <div className="flex justify-center">
                                    {chat.createdBy.displayName}
                                </div>
                            </div> */}
                            <div className="mt-3 w-full bg-gray-500 h-[2px]"></div>
                            <div className="overflow-y-auto text-sm border-b-2">
                                {messages.length ? messages.map((msg, i) => <Message key={i} msg={msg} user1={user1} />) : null}
                            </div>
                            <div className="absolute pb-7 bottom-0 flex flex-col justify-between">
                                <MessageForm
                                    handleSubmit={handleSubmit}
                                    text={text}
                                    setText={setText}
                                    setFile={setFile} />
                            </div>
                        </div>
                    ) :
                    (
                        <div className="flex items-center justify-center">Select The Client To Start Conversation</div>
                    )
                }
            </div>
        </div>

    )
}
