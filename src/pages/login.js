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
                <div className='lg:w-[76rem] lg:h-[43rem] h-screen lg:items-center grid lg:grid-cols-2 lg:bg-white shadow-lg rounded-xl bg-gred bg-opacity-[0.04] backdrop-blur-xl'>
                    {/* Left Content */}
                    <div className='flex flex-col p-10 lg:pt-10 pt-40'>
                        <div>
                            <img src="Header_Logo.png" alt="" />
                            <h1 className='font-bold text-3xl  text-gray-600 mt-5 md:w-full'>
                                Welcome back, please Sign In to your account.
                            </h1>
                            <div className='flex justify-center mt-5'>
                                <Loginform />
                            </div>
                        </div>
                    </div>
                    {/* Right content */}
                    <div className='rounded-r-xl hidden lg:block'>
                        {/* <iframe className='rounded-r-xl' src='https://my.spline.design/untitled-bacab23fa961e5d4d49bfd3be724c30d/' frameborder='0' width='100%' height='688px'></iframe> */}
                        <LoginLeftSideComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
