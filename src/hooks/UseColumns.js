import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

import { collection, collectionGroup, onSnapshot, query, where, orderBy } from 'firebase/firestore'

export const UseColumns = (col, id, _q, _sq = null) => {
    const [columns, setColumns] = useState(null)

    const q = useRef(_q).current
    const sq = useRef(_sq).current

    useEffect(() => {   
        let ref = collection(db, col, id, "columns")

        if (q) {
            if (sq) {
                ref = query(ref, where(...q), where(...sq), orderBy('position'))
            } else {
                ref = query(ref, where(...q), orderBy('position'))
            }
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (snapshot.docs === []) {
                setColumns([])
            } else {
                let results = []
                snapshot.docs.forEach(doc => {
                    results.push({ ...doc.data(), id: doc.id })
                })
                setColumns(results)
            }

        })

        return () => unsubscribe()
    }, [col, id, q, sq])

    return { columns }
}