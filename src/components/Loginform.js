import React from 'react'
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase/config";

import { UseLogin } from '../hooks/useLogin'

import { useHistory } from 'react-router-dom'

function Loginform() {


    const [email, setLoginEmail] = useState("");
    const [password, setLoginPassword] = useState("");
    const { UserLogin, error, isPending } = UseLogin();

    let history = useHistory();

    const redirectForgotPassword = () => {
        history.push('/reset')
    }

    const redirectRegister = () => {
        history.push('/register')
    }

    const handleLogin = (e) => {
        e.preventDefault();
        UserLogin(email, password).then((val) => {
            console.log("meow: ", val)

        }).catch((err) => {
            console.log("Wow Girma: ", err)
        });
    }


    useEffect(() => {
        // console.log(props.location.state);
        return () => {
        }
    })

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    // const logout = async () => {
    //     await signOut(auth);
    // }


    return (
        <div className='w-full  pr-20'>
            {error && <p className='text-red-600'>{error}</p>}
            <div className="relative mt-4">
                <input onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
                    id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
            </div>
            <div className="mt-6 relative">
                <input onChange={(event) => {
                    setLoginPassword(event.target.value);
                }}
                    id="password" type="password" name="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Password" />
                <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div className='mt-5'>
                <a onClick={redirectForgotPassword} className="mt-6 block text-sm font-medium text-secondaryGreen hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"> Forgot your password? </a>
                { }
                {!isPending && <button onClick={handleLogin} className="w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Sign In</button>}
                {isPending && <button className="cursor-not-allowed w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Loading</button>}

            </div>
            {/* <div className='invisible'>
            <img src={localStorage.getItem("profilePic")} alt="" />
            <h4>
                Logged In User:
            </h4>
            {user?.email}
            <button onClick={logout}>Signout</button>
            </div> */}
        </div>
    )
}

export default Loginform
