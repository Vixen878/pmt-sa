import React from 'react'
import { useHistory } from 'react-router-dom'
import { auth, fbAuth, googleProvider, db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { UseAuthContext } from './useAuthContext'
import { getDoc, getDocs, setDoc, doc, collection, query, where } from '@firebase/firestore';

export const UseLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = UseAuthContext()
    const history = useHistory();

    const UserLogin = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign in the user with email and password
        try {
            const admins = await getDocs(query(collection(db, "admins"), where("email", "==", email)))
            const accountManagers = await getDocs(query(collection(db, "AccountManagers"), where("email", "==", email)))

            if (admins.size == 0 && accountManagers.size == 0) {
                console.log("Unauthorized")
                setError("You are not allowed to login");
                // history.push("/login");
            } else {
                const res = await signInWithEmailAndPassword(auth, email, password)

                // dispatch a login action
                dispatch({ type: 'LOGIN', payload: res.user })
            }

            // update state
            if (!isCancelled) {
                setIsPending(false)
                // setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    // sign in with Google
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const id = result.user.reloadUserInfo.localId;
                const name = result.user.displayName;
                const email = result.user.email;
                const profilePic = result.user.photoURL;
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                localStorage.setItem("profilePic", profilePic);
                localStorage.setItem("id", id);

                let userData = {
                    id: id,
                    name: name,
                    email: email,
                    profilePic: profilePic,
                    role: "client"
                };

                let exists = (await getDoc(doc(db, "clients", id))).exists();

                if (!exists) {
                    await setDoc(doc(db, "clients", id), userData);
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }



    // sign in with facebook
    const FacebookSignIn = () => {
        signInWithPopup(auth, fbAuth)
            .then(async (result) => {
                const id = result.user.reloadUserInfo.localId;
                const name = result.user.displayName;
                const email = result.user.email;
                const profilePic = result.user.photoURL;
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                localStorage.setItem("profilePic", profilePic);
                localStorage.setItem("id", id);

                let userData = {
                    id: id,
                    name: name,
                    email: email,
                    profilePic: profilePic,
                    role: "client"
                };

                let exists = (await getDoc(doc(db, "clients", id))).exists();

                if (!exists) {
                    await setDoc(doc(db, "clients", id), userData);
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { UserLogin, FacebookSignIn, signInWithGoogle, error, isPending }
}