import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import BoardWrapper from "../components/BoardWrapper"
import { UseBoard } from "../hooks/useBoard";


function ActiveProject() {

    

    const { id } = useParams()
    // const { document, error } = UseDocument('projects', id)
    
    const { boardData } = UseBoard(id)

    console.log("This is the board:", boardData)

    // if (error) {
    //     return <div className="text-red-900">{error}</div>
    // }

    if (!boardData) {
        return <div>Loading...</div>
    }

  
    return (
        <div className="w-full">
            {/* <span className='text-4xl'>{document.name}</span> */}
            <BoardWrapper board={boardData} />
        </div>
    )
}

export default ActiveProject
