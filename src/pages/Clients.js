import { Link } from "react-router-dom"
import { UseCollection } from "../hooks/useCollection"

function Clients() {

    const { documents } = UseCollection('clients')
    console.log("Clients", documents)

    return (
        <div className="pl-8 pt-12">
            {documents && documents.map(doc => (
                <div className="p-4 mt-4 flex rounded-lg shadow-lg space-x-6 items-center border">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-purple-500 w-24 flex h-24 rounded-full">
                            Profile Picture
                        </div>

                    </div>
                    <Link className="flex flex-col" to="#">
                        <span className="text-sm text-gray-400">{doc.displayName}</span>
                    </Link>
                    {doc.online && <div className="bg-green-500 w-3 h-3 rounded-full">
                    </div>}
                    {!doc.online && <div className="bg-red-500 w-3 h-3 rounded-full">
                    </div>}
                </div>
            ))}
        </div>
    )
}

export default Clients
