import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc, deleteDoc } from "firebase/firestore";
import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const UseFirestore = (col) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection reference 
    const ref = doc(collection(db, col))

    // dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {

            const addedDocument = setDoc(ref, { ...doc, createdAt: serverTimestamp() })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err })
            return false;
        }

        return true;
    }

    // delete document 
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {

            const deleteResponse = await deleteDoc(doc(db, col, id))
            console.log(deleteResponse)
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: id })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err })
            return false;
        }

        return true;
    }



    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}