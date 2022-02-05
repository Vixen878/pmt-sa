import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import { collection, onSnapshot, doc } from 'firebase/firestore'
import { UseCollection } from "./useCollection"

export const UseBoard = (id) => {
    const [boardData, setBoardData] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        let ref = collection(db, "boards")

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setBoardData(results)
        })

        return () => unsubscribe()

    }, [id])

    return { boardData, error }
}