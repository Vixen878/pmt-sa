import { useEffect, useState } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { GetUserAccessLevel, Users } from '../hooks/useUserAccessLevel';

import { db } from "../firebase/config";

export const UseNotifications = () => {
    const { user } = UseAuthContext();
    const { accessLevel } = GetUserAccessLevel();

    Array.prototype.unique = function () {
        var a = this.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i]?.id === a[j]?.id)
                    a.splice(j--, 1);
            }
        }

        return a;
    };

    const [notifications, setNotifications] = useState(null)
    const [newNotifications, setNewNotifications] = useState(false)
    const [error, setError] = useState(null)
    const [user_notifications, setUserNotifications] = useState(null)
    const [role_notifications, setRoleNotifications] = useState(null)

    useEffect(() => {

        let user_target_query = query(collection(db, "notifications"), where('user_target', '==', user.uid))
        let role_target_query = query(collection(db, "notifications"), where('role_target', 'array-contains', (accessLevel === Users.Admin ? 'admin' : 'acm')))

        const user_query_unsubscribe = onSnapshot(user_target_query, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setError(null)
            setUserNotifications(results)

            setNotifications(user_notifications?.concat(role_notifications).unique())

            setNewNotifications(notifications?.filter(n => n?.is_read === false).length > 0)
        }, (err) => {
            console.log(err.message)
            setError(err)
        })

        const role_query_unsubscribe = onSnapshot(role_target_query, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setError(null)
            setRoleNotifications(results)

            setNotifications(user_notifications?.concat(role_notifications).unique())

            setNewNotifications(notifications?.filter(n => n?.is_read === false).length > 0)
        }, (err) => {
            console.log(err.message)
            setError(err)
        })

        return () => {
            user_query_unsubscribe()
            role_query_unsubscribe()
        };
    }, [notifications, role_notifications, user.uid, user_notifications]);



    return { notifications, newNotifications, error }
}