import React, { useEffect, useState } from 'react';
import Board, { moveCard, allo } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import { db } from '../firebase/config';


export default function BoardWrapper({ board, onNewCard, onRenameColumn, onRenameCard, onRemoveCard, onColumnNew }) {

    //Uncontrolled
    function UncontrolledBoard() {
        return (
            <div>
                {/* <Board
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
                onNewCardConfirm={onNewCard}
                onCardNew={console.log}
                allowAddColumn={{ on: "right" }}
                onNewColumnConfirm={(draftColumn) => ({
                    id: new Date().getTime(),
                    title: "new Card",
                    ...draftColumn
                })}
                onColumnNew={console.log}
            /> */}
                <Board
                    allowRemoveLane
                    allowRenameColumn
                    allowRemoveCard
                    allowRemoveColumn
                    onLaneRemove={console.log}
                    onLaneRename={console.log}
                    allowAddColumn={{ on: "right" }}
                    initialBoard={board}
                    allowAddCard={{ on: "top" }}
                    onColumnNew={onColumnNew}
                    onColumnRename={onRenameColumn}
                    onCardNew={onNewCard}
                    onCardRename={onRenameCard}
                    onCardRemove={onRemoveCard}
                    onNewColumnRemove={(draftColumn) => ({
                        id: new Date().getTime(),
                        ...draftColumn
                    })}
                    onNewColumnConfirm={(draftColumn) => ({
                        id: new Date().getTime(),
                        title: "new Card",
                        ...draftColumn
                    })}
                    onNewCardConfirm={draftCard => ({
                        id: new Date().getTime(),
                        ...draftCard
                    })}
                />
            </div>
        );
    }
    return (
        <div>
            <UncontrolledBoard />
        </div>
    )
}


