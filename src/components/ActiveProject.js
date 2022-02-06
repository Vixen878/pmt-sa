import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import BoardWrapper from "../components/BoardWrapper"
import { UseColumns } from "../hooks/UseColumns";
import { UseCards } from "../hooks/UseCards";
import { collection, doc, setDoc, onSnapshot, query, addDoc, Timestamp, orderBy, deleteDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/config";

import { v4 as uuidv4 } from 'uuid';

function ActiveProject() {
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
                    description: card.description
                })

                cardId++;
            })

            colId++;
        });

        return (
            <div className="w-full">
                <span className='text-4xl'>{document.name}</span>
                <BoardWrapper board={boardData}
                    onNewCard={onNewCard}
                    onRenameColumn={onRenameColumn}
                    onRenameCard={onRenameCard}
                    onRemoveCard={onRemoveCard}
                    onColumnNew={onColumnNew} />
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
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    async function onRenameColumn(_, column) {
        await updateDoc(doc(db, "boards", id, "columns", column.key), {
            title: column.title
        })
    }

    async function onRenameCard(_, column, card) {
        await updateDoc(doc(db, "boards", id, "columns", column.key, "cards", card.key), {
            title: card.title,
            description: card.description
        })
    }

    async function onRemoveCard(_, column, card) {
        await deleteDoc(doc(db, "boards", id, "columns", column.key, "cards", card.key))
    }

    async function onColumnNew(_, column) {
        let newColId = uuidv4()

        await setDoc(doc(db, "boards", id, "columns", newColId), {
            id: newColId,
            title: column.title,
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    return (
        <div></div>
    )
}

export default ActiveProject
