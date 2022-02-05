import { setDoc, doc } from "firebase/firestore"
import { useState } from "react"
import { UseAuthContext } from "../hooks/useAuthContext"
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile, getAuth, signOut } from 'firebase/auth'
import { initializeApp } from "firebase/app";

function AddAccountManagerModal(props) {

    const { user } = UseAuthContext()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const createdBy = {
            displayName: user.displayName,
            id: user.uid
        }

        var config = {
            apiKey: "AIzaSyAJH8ZLFC9aYdUDbqjnE7J67MICkKW5CcY",
            authDomain: "elik-project-managment-tool.firebaseapp.com",
            projectId: "elik-project-managment-tool",
            storageBucket: "elik-project-managment-tool.appspot.com",
            messagingSenderId: "599744157195",
            appId: "1:599744157195:web:815a6c60466f8f647b590e",
            measurementId: "${config.measurementId}"
        };
        var secondaryApp = initializeApp(config, "Secondary");

        const response = await createUserWithEmailAndPassword(getAuth(secondaryApp), email, password)
        signOut(getAuth(secondaryApp));

        const newUser = {
            name: email,
            email,
            createdBy: createdBy
        }

        await setDoc(doc(db, "AccountManagers", response.user.uid), {
            ...newUser,
            online: true
        });
        if (!response.error) {
            props.cModal()
        } else {
            console.log(response.error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="relative mt-4">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id="pName" required name="pName" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Project Title" />
                    <label for="pName" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Project Title</label>
                </div>
                <div class="relative mt-7">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="pDescription" required name="pDescription" type="password" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Project Description" />
                    <label for="pDescription" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Project Description</label>
                </div>
                <button
                    className="inline-flex mt-4 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                    Create
                </button>
            </form>
        </div >
    )
}

export default AddAccountManagerModal
