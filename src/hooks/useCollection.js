import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const UseCollection = (col, _q, _sq = null) => {
    const [documents, setDocuments] = useState(null)

    const q = useRef(_q).current
    const sq = useRef(_sq).current

    useEffect(() => {
        let ref = collection(db, col)

        if (q) {
            if (sq === null) {
                ref = query(ref, where(...q))
            } else {
                ref = query(ref, where(...q), where(...sq))
            }
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(results)
        })

        return () => unsubscribe()
    }, [col, q, sq])

    return { documents }
}   