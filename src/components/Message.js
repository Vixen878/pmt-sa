import React from 'react';
import Moment from 'react-moment'

const Message = ({ msg, user1 }) => {
    return (
        <div className={`mt-[5px] pr-[5px] ${msg.from === user1 ? "text-right" : ""}`}>
            <span className={`p-3 inline-block max-w-[50%] text-left rounded-tl-xl rounded-tr-xl rounded-bl-xl ${msg.from === user1 ? "bg-blue-500 text-white" : "bg-orange-400"}`}>
                <div className='text-[20px]'>
                    {msg.media ? <img className='w-full rounded' src={msg.media} alt={msg.text} /> : null}
                    {msg.text}
                </div>
                
                <span className='mt-2 text-gray-200 text-sm'>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </span>
            </span>
        </div>
    )
};

export default Message;
