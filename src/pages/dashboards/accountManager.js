import { Link } from "react-router-dom";
import { UseCollection } from '../../hooks/useCollection'
import ActiveProjects from "../../components/ActiveProjects";

export default function AccountManagerDashboard() {

    const { documents } = UseCollection('requests', ["isApproved", "==", false])

    return (
        <div className="h-screen m-4">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <span className="text-3xl text-primaryGreen font-semibold">
                        Overview
                    </span>
                    <div className="flex flex-row space-x-3 text-primaryGreen pr-2">
                        <Link to={`notifications`}>
                            <div className="w-6 h-6 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Notifications</title><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                            </div>
                        </Link>

                        <div className="w-6 h-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Chatbox</title><path d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" /></svg>
                        </div>
                    </div>
                </div>
                <div className="flex h-screen flex-row space-x-5">
                    <div className="flex flex-col overflow-auto shadow-xl border rounded-xl mt-4 w-[50%]">
                        <div className="pt-4 w-full pl-4 flex justify-between">
                            <span className="text-xl font-semibold text-green-800">Project requests</span>
                            <span className="items-center pr-4 text-sm text-green-400">View More</span>
                        </div>
                        <div className="m-2">
                            {documents && documents.map(doc => (
                                <div className="p-4 mt-4 mx-2 flex rounded-lg shadow-lg space-x-6 items-center border">
                                    <div className="flex flex-col items-center justify-center">
                                        <img className="rounded-full ml-4 bg-primaryGreen w-24 h-24" src="/images/idea.png" alt="User Avatar" />
                                    </div>
                                    <Link className="flex flex-col" to={`/requests/${doc.id}`} key={doc.id}>
                                        <span className="text-primaryGreen text-2xl font-semibold">{doc.name}</span>
                                        <span className="text-sm text-gray-400">By: {doc.createdBy.displayName}</span>
                                        <span className="text-gray-500 text-lg">{doc.description}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 w-[50%]">
                        <div className="h-full flex flex-col overflow-auto bg-white shadow-xl border rounded-xl">
                            <div className="pt-4 w-full pl-4 flex justify-between">
                                <span className="text-xl font-semibold text-green-800">Active Projects</span>
                                <span className="items-center pr-4 text-sm text-green-400">View More</span>
                            </div>
                            <div className="p-6">
                                <ActiveProjects />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
