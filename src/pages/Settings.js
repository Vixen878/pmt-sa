import React from 'react'
import { useState, useEffect } from "react"
import { db } from '../firebase/config'
import { UseAuthContext } from "../hooks/useAuthContext";
import { UseDocument } from "../hooks/useDocument"
import { GetUserAccessLevel, Users } from '../hooks/useUserAccessLevel';

import { doc, updateDoc } from '@firebase/firestore';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../firebase/config"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
    const { user } = UseAuthContext()
    const { accessLevel } = GetUserAccessLevel();
    const { document } = UseDocument(accessLevel == Users.AccountManager ? 'AccountManagers' : 'admins', user.uid)

    const [displayName, setDisplayName] = useState(null);
    const [fileInputName, setInputFileName] = useState(null);
    const [isProfilePictureUploadPending, setIsProfilePictureUploadPending] = useState(false);

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
                    await updateDoc(doc(db, accessLevel == Users.AccountManager ? 'AccountManagers' : 'admins', user.uid), {
                        profilePicture: profilePictureURL,
                        isDefaultProfilePicture: false
                    })

                    toast.info('Profile picture changed successfully', { autoClose: 5000 })

                    setIsProfilePictureUploadPending(false)
                })
            }
        )
    }

    async function onNameChanged(newName) {
        try {
            await updateDoc(doc(db, accessLevel == Users.AccountManager ? 'AccountManagers' : 'admins', user.uid), {
                displayName: newName
            })

            toast.info('Display name changed', { autoClose: 2000 })
        } catch {
            toast.error('Error changing name', { autoClose: 6000 })
        }
    }

    return (
        <div className="w-full flex flex-col mx-9 my-4 antialiased overflow-hidden">
            <div className='flex flex-row space-x-4 items-center'>
                <div className='text-primaryGreen w-8 h-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Settings</title><path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
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

            {document &&
                <div className="mt-6">
                    <span className="text-lg text-gray-600 font-semibold">Display Name</span>
                    <input
                        onKeyPress={(e) => e.key === 'Enter' && onNameChanged(e.target.value)}
                        onChange={e => setDisplayName(e.target.value)}
                        value={displayName}
                        type="text"
                        required
                        placeholder="Display Name"
                        className="p-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:to-blue-700 border w-full" />
                </div>}
        </div>
    );
}

export default Settings
