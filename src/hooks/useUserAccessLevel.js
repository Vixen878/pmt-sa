import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { UseAuthContext } from './useAuthContext';
import { getDoc, doc, collection } from "firebase/firestore"

const GetUserAccessLevel = () => {
    const { user } = UseAuthContext()
    const [accessLevel, setAccessLevel] = useState(Loading);

    useEffect(() => {
        let unmounted = false;

        let uid = user?.uid;
        if (uid)
            getDoc(doc(collection(db, "AccountManagers"), uid)).then(value => {
                if (value.exists()) {
                    if (!unmounted)
                        setAccessLevel(AccountManager)
                } else {
                    getDoc(doc(collection(db, "admins"), uid)).then(value => {
                        if (value.exists() && !unmounted) {
                            setAccessLevel(Admin)
                        }
                    })
                }
            })

        return () => {
            unmounted = true
        }
    }, [])

    return { accessLevel };
}

const Loading = 0;
const AccountManager = 1;
const Admin = 2;

const Users = {
    Loading, AccountManager, Admin
}

export { GetUserAccessLevel, Users }