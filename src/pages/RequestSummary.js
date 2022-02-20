// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MessageForm from "../components/MessageForm";
import { UseAuthContext } from "../hooks/useAuthContext"
import { UseDocument } from '../hooks/useDocument';
import { useHistory } from "react-router-dom";

import { collection, doc, setDoc, onSnapshot, query, addDoc, Timestamp, orderBy, deleteDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from "../firebase/config";

import Message from "../components/Message";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';

import { UseFirestore } from '../hooks/useFirestore';
import Chat from "../components/Chat";
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebase/config";

export default function RequestSummary({ request }) {

    const { id } = useParams()
    const { document, error } = UseDocument("requests", id);

    const { user } = UseAuthContext()
    const user1 = user.uid

    // Messages
    const [text, setText] = useState("")
    const [file, setFile] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        let chatFetch = async () => {
            const user2 = document?.createdBy.id
            const id = request.id

            if (user2 != null) {
                const addAccountManagerId = {
                    Acid: user1,
                    Cid: user2,
                    projectId: request.id
                }

                await setDoc(doc(db, "messages", id), {
                    ...addAccountManagerId
                })
            }

            const msgsRef = collection(db, 'messages', id, 'chat')
            const q = query(msgsRef, orderBy('createdAt', 'asc'))

            let unsubscribe = onSnapshot(q, querySnapshot => {
                let msgs = []
                querySnapshot.forEach(d => {
                    msgs.push(d.data())
                })
                setMessages(msgs)
            })

            return () => {
                unsubscribe()
            };
        }

        chatFetch()
    }, [document?.createdBy.id, request.id, user1]);

    // Display Categories
    var categories = []
    for (var i = 0; i < request.category.length; i++) {
        categories.push(request.category[i].value.Category);
    }

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
        <div className="flex h-full">
            <div className="w-3/5 p-5">
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
                        <div className="mt-3">Client: {request.createdBy.displayName}</div>
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
            <div className="w-2/5 h-full">
                <Chat id={id} project={document} />
            </div>
        </div>

    )
}
