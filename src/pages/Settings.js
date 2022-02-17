import React from 'react'
import { useState, useEffect } from "react"
import { db } from '../firebase/config'
import { UseAuthContext } from "../hooks/useAuthContext";
import { UseDocument } from "../hooks/useDocument"

import { getDoc, setDoc, doc, updateDoc } from '@firebase/firestore';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../firebase/config"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
    const [fileInputName, setInputFileName] = useState(null);
    const [isProfilePictureUploadPending, setIsProfilePictureUploadPending] = useState(false);

    const { user } = UseAuthContext()
    const { document } = UseDocument('AccountManagers', user.uid)

    function fileInput(event) {
        setInputFileName(event.target.files[0])
    }

    async function onHandleProfilePictureSubmit(event) {
        event.preventDefault()

        setIsProfilePictureUploadPending(true)

        const file = event.target[0].files[0]
        const uploadPath = `ProfilePictures/${user.uid}.${file.name.split('.').pop()}`
        const storageRef = await ref(storage, uploadPath)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {

        },
        (err) => console.log(err),
        async () => {
            await getDownloadURL(uploadTask.snapshot.ref)
                .then(async (profilePictureURL) => {
                    await updateDoc(doc(db, "AccountManagers", user.uid), {
                        profilePicture: profilePictureURL,
                        isDefaultProfilePicture: false
                    })

                    toast.info('Profile picture changed successfully', { autoClose: 5000 })

                    setIsProfilePictureUploadPending(false)
                })
            }
        )
    }

    return (
        <div className="w-full flex flex-col mx-9 my-4 antialiased overflow-hidden">
            <div className='flex flex-row space-x-4 items-center'>
                <div className='text-primaryGreen w-8 h-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Grid</title><rect x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                </div>
                <span className='text-4xl font-bold'>
                    Settings
                </span>
            </div>

            <form onSubmit={onHandleProfilePictureSubmit}>
                <div className="mt-6">
                    <span className="text-lg text-gray-600 font-semibold">Profile picture</span>
                    <div className="relative mt-2 h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                        <div className="absolute">
                            {!fileInputName &&
                                <div className="flex flex-col items-center text-gray-400">
                                    <img className="rounded-full bg-primaryGreen w-16 h-16" src={document?.profilePicture} alt="User Avatar" />
                                    <span className="block text-gray-400 font-normal">Drag drop an image</span>
                                    <span className="block text-gray-400 font-normal">or</span>
                                    <span>{fileInputName}</span>
                                    <span className="block text-blue-400 font-normal">Browse files</span>

                                </div>
                            }
                            {fileInputName &&
                                <div>
                                    <img className="rounded-full ml-4 bg-primaryGreen w-16 h-16" src={URL.createObjectURL(fileInputName)} alt="User Avatar" />
                                </div>
                            }

                        </div>
                        <input
                            type="file"
                            required onChange={fileInput}
                            className="h-full w-full opacity-0" name="" accept=".png, .jpg, .jpeg" />
                    </div>
                    {fileInputName && !isProfilePictureUploadPending && <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primaryGreen border border-transparent rounded-md hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                        Set new profile picture
                    </button>}
                    {fileInputName && isProfilePictureUploadPending && <button
                        disabled
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-900 border border-transparent rounded-md">
                        Setting new profile picture...
                    </button>}
                </div>
            </form>
        </div>
    );
}

export default Settings
