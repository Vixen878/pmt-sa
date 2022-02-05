import { onAuthStateChanged } from "firebase/auth";
import { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";

const AuthContext = createContext()

export default AuthContext

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default: return state
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            dispatch({ type: 'AUTH_IS_READY', payload: currentuser })
            unsubscribe()
        })
        return () => {

        }
    }, [])

    console.log('authContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}