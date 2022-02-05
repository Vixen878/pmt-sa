import React, { useEffect } from 'react'
import AnimatedBlurBlobs from '../components/AnimatedBlurBlobs';
import Loginform from '../components/Loginform'
import LoginLeftSideComponent from '../components/LoginLeftSideComponent';
import { UseLogin } from '../hooks/useLogin';


function LoginPage() {

    const { FacebookSignIn, signInWithGoogle, error, isPending } = UseLogin()


    return (
        <div className='w-screen h-screen relative flex justify-center items-center px-16 overflow-hidden'>
            {/* Top Blobs */}
            <div className='text-2xl absolute top-64 left-44 w-full max-w-lg blur-xl'>
                <AnimatedBlurBlobs />
            </div>
            {/* Bottom Blobs */}
            <div className='text-2xl absolute top-[48rem] left-[85rem] w-full max-w-lg blur-xl'>
                <AnimatedBlurBlobs />
            </div>
            <div className='absolute'>
                <div className='w-[76rem] h-[43rem] items-center grid grid-cols-2 bg-white shadow-lg rounded-xl '>
                    {/* Left Content */}
                    <div className='flex flex-col p-10'>
                        <div>
                            <img src="Header_Logo.png" alt="" />
                            <h1 className='font-bold text-3xl  text-gray-600 mt-5 md:w-4/5'>
                                Welcome back, please Sign In to your account.
                            </h1>
                            <div className='flex justify-center mt-5'>
                                <Loginform />
                            </div>
                        </div>
                    </div>
                    {/* Right content */}
                    <div className='rounded-r-xl'>
                        {/* <iframe className='rounded-r-xl' src='https://my.spline.design/untitled-bacab23fa961e5d4d49bfd3be724c30d/' frameborder='0' width='100%' height='688px'></iframe> */}
                        <LoginLeftSideComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
