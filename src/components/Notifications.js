import React from 'react';
import { Link } from 'react-router-dom';
import { UseAuthContext } from '../hooks/useAuthContext';
import { UseCollection } from '../hooks/useCollection'

const Notifications = () => {

    const { user } = UseAuthContext();

    const { documents } = UseCollection('notifications',
        ['target', '==', user.uid])

    return (
        <div className='m-5'>
            <div className='flex flex-row space-x-4 items-center'>
                <div className='text-primaryGreen w-8 h-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Notifications</title><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                </div>
                <span className='text-2xl font-bold'>
                    Notifications
                </span>
            </div>
            <div className='mt-4 flex flex-col w-full'>
                {documents && documents.map(doc => (
                    <a {...(doc.relative_link ? {href: doc.relative_link} : {})}>
                        <div className="p-2 mt-4 mx-2 flex rounded-lg shadow-lg space-x-6 items-center border" key={doc.id}>
                            <div className="flex flex-col items-center justify-center">
                                <div className='text-primaryGreen w-8 h-8'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Notifications</title><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                                </div>
                            </div>
                            <div>
                                <span>{doc.content}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Notifications;
