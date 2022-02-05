import { signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { UseAuthContext } from './useAuthContext'
import { useHistory } from 'react-router-dom'

export const useLogout = () => {

    const history = useHistory()

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = UseAuthContext()

    const logout = () => {
        setError(null)
        setIsPending(true)

        // logout user
        try {
            signOut(auth);

            // dispatch 
            dispatch({ type: 'LOGOUT' })

            //update state
            if (!isCancelled) {
                history.push('/login')
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () =>
            setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}