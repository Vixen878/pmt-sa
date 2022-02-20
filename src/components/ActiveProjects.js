import { Link } from "react-router-dom"
import { UseCollection } from "../hooks/useCollection"

import { UseAuthContext } from '../hooks/useAuthContext';

export default function ActiveProjects() {
    const { user } = UseAuthContext()

    const { documents } = UseCollection('projects',
        ['cid', '==', user.uid])

    return (
        <div>
            {documents && documents.map(doc => (
                <div className="p-4 mt-4 flex rounded-lg shadow-lg space-x-6 items-center border">
                    <div className="flex flex-col items-center justify-center">
                        <img className="rounded-full ml-4 bg-primaryGreen w-24 h-24" src="/images/idea.png" alt="User Avatar" />
                    </div>
                    <Link className="flex flex-col" to={`/project/${doc.id}`} key={doc.id}>
                        <span className="text-primaryGreen text-2xl font-semibold">{doc.name}</span>
                        <span className="text-sm text-gray-400">By: {doc.createdBy.displayName}</span>
                        <span className="text-gray-500 text-lg">{doc.description}</span>
                    </Link>
                </div>
            ))}
        </div>
    )
}
