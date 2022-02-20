import React from 'react';
import Attachment from './Attachment';

const MessageForm = ({ handleSubmit, text, setText, setFile, project }) => {
    return (
        <form className='w-full' onSubmit={(event) => {
            event.preventDefault()

            if (project.isCompleted)
                alert("Can't send message to completed project")
            else
                handleSubmit(event)
        }}>
            <div className="pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        disabled={project.isCompleted ? "disabled" : ""}
                        placeholder="Write a message"
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-7 bg-gray-200 rounded-full py-3" />
                    <div className="absolute space-x-3 right-0 items-center inset-y-0 hidden sm:flex">
                        <label htmlFor="file">
                            <Attachment />
                        </label>
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            className='hidden'
                            type="file"
                            disabled={project.isCompleted ? "disabled" : ""}
                            id="file" />
                        <button
                            type="submit"
                            disabled={project.isCompleted ? "disabled" : ""}
                            className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-primaryGreen hover:bg-blue-400 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default MessageForm;
