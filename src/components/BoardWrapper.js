import React, { useEffect, useState } from 'react';
import Board, { moveCard, allo } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import { db } from '../firebase/config';


export default function BoardWrapper({ board }) {

    //Uncontrolled
    function UncontrolledBoard() {
        return (
            <Board
                allowRemoveLane
                allowRenameColumn
                allowRemoveCard
                allowRemoveColumn
                onLaneRemove={console.log}
                onCardRemove={console.log}
                initialBoard={board}
                allowAddCard={{ on: "top" }}
                onColumnRename={(val) => {
                    // console.log("This is val", val.columns[0].title)
                }}
                onLaneRename={console.log}
                onNewCardConfirm={(draftCard) => ({
                    id: new Date().getTime(),
                    ...draftCard
                })}
                onCardNew={console.log}
                allowAddColumn={{ on: "right" }}
                onNewColumnConfirm={(draftColumn) => ({
                    id: new Date().getTime(),
                    title: "new Card",
                    ...draftColumn
                })}
                onColumnNew={console.log}
            />
        );
    }
    return (
        <div>
            <UncontrolledBoard />
        </div>
    )
}


