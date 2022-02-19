import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import ActiveProject from "../components/ActiveProject"


function Project() {

    const { id } = useParams()
    const { document, error } = UseDocument('projects', id)

    console.log("This is the doc:", document)

    if (error) {
        return <div className="text-red-900">{error}</div>
    }

    if (!document) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full h-full">
            <ActiveProject project={document} />
        </div>
    )
}

export default Project
