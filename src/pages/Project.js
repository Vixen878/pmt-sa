import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import ActiveProject from "../components/ActiveProject"

import happy from "../components/undraw_Happy_announcement_re_tsm0.png"
import { Link } from "react-router-dom"

function Project() {

    const { id } = useParams()
    const { document, error } = UseDocument('projects', id)

    if (error) {
        return <div className="text-red-900">{error}</div>
    }

    if (!document) {
        return <div>Loading...</div>
    }

    if (document.isCancelled) {
        return (
            <div className="flex mt-16 flex-col w-full justify-center items-center">
                <span className="text-6xl font-bold text-red-500">Oops!!!</span>
                <img className="w-72 " src={happy} alt="" />
                <span className="text-4xl text-red-600 font-bold">
                    Your project has been cancelled
                </span>
                <Link to={'/'}>
                    <div className="bg-gray-700 rounded-md cursor-pointer p-3 mt-10">
                        <span className="text-white">
                            Go to projects Dashboard
                        </span>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <ActiveProject project={document} />
        </div>
    )
}

export default Project
