import { Link } from "react-router-dom"
import { UseCollection } from "../hooks/useCollection"

export default function ActiveProjects() {
    const { documents } = UseCollection('projects')
    return (
        <div>
            {documents && documents.map(doc => (
                <div className="p-4 mt-4 flex rounded-lg shadow-lg space-x-6 items-center border">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-green-500 w-24 flex h-24 rounded-full">
                            Profile Picture
                        </div>

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
