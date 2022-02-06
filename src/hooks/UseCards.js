import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

import { collection, collectionGroup, onSnapshot, query, where, orderBy } from 'firebase/firestore'

export const UseCards = (col, _q, _sq = null) => {
    const [cards, setCards] = useState(null)

    const q = useRef(_q).current
    const sq = useRef(_sq).current

    useEffect(() => {
        let ref = collectionGroup(db, col)

        if (q) {
            if (sq) {
                ref = query(ref, where(...q), where(...sq), orderBy('position'))
            } else {
                ref = query(ref, where(...q), orderBy('position'))
            }
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (snapshot.docs === []) {
                setCards([])
            } else {
                let results = []
                snapshot.docs.forEach(doc => {
                    results.push({ ...doc.data(), id: doc.id })
                })
    
                setCards(results)
            }
        })

        return () => unsubscribe()
    }, [col, q, sq])

    return { cards }
}