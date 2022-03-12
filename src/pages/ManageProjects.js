import { Link } from "react-router-dom"
import { UseCollection } from "../hooks/useCollection"

import { UseAuthContext } from '../hooks/useAuthContext';
import { GetUserAccessLevel, Users } from "../hooks/useUserAccessLevel";
import { useState } from "react";

export default function ManageProjects() {

    const { user } = UseAuthContext()
    const { accessLevel } = GetUserAccessLevel();

    const [searchTerm, setSearchTerm] = useState("");

    const acmDocuments = UseCollection('projects', ['cid', '==', user.uid]).documents
    const allDocuments = UseCollection('requests').documents

    const docs = accessLevel === Users.Admin ? allDocuments : accessLevel === Users.AccountManager ? acmDocuments : null;
    const searchedDocs = docs?.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="w-full flex flex-col px-9 py-4 antialiased overflow-hidden">
            <div className='flex flex-row space-x-4 items-center'>
                <div className='text-primaryGreen w-8 h-8'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Settings</title><path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                </div>
                <span className='text-4xl font-bold'>
                    Manage Projects
                </span>

                <div className="flex-1"></div>

                <form className="flex bg-primaryGreen bg-opacity-10 rounded-xl">
                    <input type="text" className="bg-gray-100 rounded-l-xl bg-opacity-20 px-4 py-2 w-full h-11"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for projects..." />
                    <button className="flex items-center justify-center px-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                    </button>
                </form>
            </div>

            <div className="space-y-6 mt-8">
                {searchedDocs && searchedDocs.map(doc => (
                    <Link className="flex flex-col" to={doc.isApproved ? `/project/${doc.id}` : `/requests/${doc.id}`} key={doc.id}>
                        <div className="p-4 flex rounded-lg shadow-lg space-x-6 items-center border">
                            <div className="flex flex-col items-center justify-center">
                                <img className="rounded-full ml-4 bg-primaryGreen w-24 h-24" src="/images/idea.png" alt="User Avatar" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-primaryGreen text-2xl font-semibold">{doc.name}</span>
                                <span className="text-sm text-gray-400">By: {doc.createdBy.displayName}</span>
                                <span className="text-gray-500 text-lg">{doc.description}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
