import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import BoardWrapper from "../components/BoardWrapper"
import { UseColumns } from "../hooks/UseColumns";
import { UseCards } from "../hooks/UseCards";
import { collection, doc, setDoc, onSnapshot, query, addDoc, Timestamp, orderBy, deleteDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/config";

import { v4 as uuidv4 } from 'uuid';
import Chat from "./Chat";
import { toast } from "react-toastify";

function ActiveProject() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const { id } = useParams()
    const { document, error } = UseDocument('projects', id)

    const { columns } = UseColumns("boards", id)
    const { cards } = UseCards("cards", ["projectId", "==", id])

    if (error) {
        return <div className="text-red-900">{error}</div>
    }

    if (!columns) {
        return <div>Loading...</div>
    }

    if (columns !== null && cards !== null) {
        let boardData = {
            columns: []
        }

        let colId = 1;
        let cardId = 1;
        columns.forEach(col => {
            boardData.columns.push({
                id: colId,
                key: col.id,
                title: col.title,
                cards: []
            })

            cards.filter(c => c.colId === col.id).forEach(card => {
                boardData.columns[colId - 1].cards.push({
                    id: cardId,
                    key: card.id,
                    title: card.title,
                    description: card.description,
                    cardInfo: card
                })

                cardId++;
            })

            colId++;
        });

        function markAsCompleted() {
            try {
                updateDoc(doc(db, "projects", id), {
                    isCompleted: true
                })

                updateDoc(doc(db, "requests", id), {
                    isCompleted: true
                })

                toast.success("Project marked as successful")
            } catch (ex) {
                toast.error(`Error ocurred: ${ex}`)
            }
        }

        return (
            <div className="h-full">
                <div className="flex">
                    <div className="flex w-3/4">
                        <span className='text-4xl'>{document.name}</span>
                        <div className="flex-1"></div>
                        {!document?.isCompleted &&
                            <span className="rounded border p-3 bg-primaryGreen font-semibold text-white hover:bg-green-700 cursor-pointer right"
                                onClick={() => { if (window.confirm("Are you sure you want to mark the project as completed?")) markAsCompleted() }}>
                                Mark as Completed
                            </span>}
                    </div>
                    <div className="w-1/4"></div>
                </div>
                <div className="flex h-full">
                    <div className="w-3/4 relative pt-3">
                        {document?.isCompleted &&
                            <div className="absolute h-full w-full flex items-center justify-center backdrop-blur-md">
                                <span className="text-green-700 text-2xl">Project completed</span>
                            </div>
                        }
                        <BoardWrapper
                            board={boardData}
                            onNewCard={onNewCard}
                            onRenameColumn={onRenameColumn}
                            onRenameCard={onRenameCard}
                            onRemoveCard={onRemoveCard}
                            onColumnNew={onColumnNew}
                            onColumnRemove={onColumnRemove}
                            onCardDragEnd={onCardDragEnd} />
                    </div>
                    <div className="w-1/4 h-full mt-[-3%]">
                        <Chat id={id} project={document} />
                    </div>
                </div>
            </div>
        )
    }

    async function onNewCard(_, column, card) {
        let newCardId = uuidv4()

        await setDoc(doc(db, "boards", id, "columns", column.key, "cards", newCardId), {
            colId: column.key,
            description: card.description,
            id: newCardId,
            projectId: id,
            title: card.title,
            createdAt: Timestamp.fromDate(new Date()),
            position: column.cards.length
        })
    }

    async function onColumnNew(board, column) {
        let newColId = uuidv4()

        await setDoc(doc(db, "boards", id, "columns", newColId), {
            id: newColId,
            title: column.title,
            createdAt: Timestamp.fromDate(new Date()),
            position: board.columns.length
        })
    }

    async function onRenameCard(_, column, card) {
        await updateDoc(doc(db, "boards", id, "columns", column.key, "cards", card.key), {
            title: card.title,
            description: card.description
        })
    }

    async function onRenameColumn(_, column) {
        await updateDoc(doc(db, "boards", id, "columns", column.key), {
            title: column.title
        })
    }

    async function onRemoveCard(_, column, card) {
        await deleteDoc(doc(db, "boards", id, "columns", column.key, "cards", card.key))
    }

    async function onColumnRemove(_, column) {
        await deleteDoc(doc(db, "boards", id, "columns", column.key))
    }

    async function onCardDragEnd(board, card, source, destination) {
        // await delay(2000)

        if (source.fromColumnId !== destination.toColumnId) {
            await Promise.all([
                setDoc(doc(db, "boards", id, "columns", board.columns[destination.toColumnId - 1].key, "cards", card.key), {
                    ...card.cardInfo,
                    colId: board.columns[destination.toColumnId - 1].key
                }),
                deleteDoc(doc(db, "boards", id, "columns", card.cardInfo.colId, "cards", card.key))
            ])
        }

        for (let i = 0; i < board.columns.length; i++) {
            // console.log("col " + board.columns[i].title + " = " + i)
            await updateDoc(doc(db, "boards", id, "columns", board.columns[i].key), {
                position: i
            })

            for (let j = 0; j < board.columns[i].cards.length; j++) {
                // console.log("card " + board.columns[i].cards[j].title + " = " + j)

                await updateDoc(doc(db, "boards", id, "columns", board.columns[i].key, "cards", board.columns[i].cards[j].key), {
                    position: j
                })
            }
        }
    }

    return (
        <div></div>
    )
}

export default ActiveProject
