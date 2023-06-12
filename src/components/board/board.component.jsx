import React from "react"
import SubBoard from "../sub-board/sub-board.component"

import "./board.css"

function Board({ boardData, onSubBoardClick }) {
    const handleCellClick = (subBoardIndex, cellIndex) => {
        onSubBoardClick(subBoardIndex, cellIndex);
    };

    return(
        <div className="Board">
            {boardData.map((subBoard, index) => (
                <SubBoard
                    key={index}
                    subBoard={subBoard.cells}
                    index={index}
                    //TODO
                    disable={subBoard.value !== null}
                    onCellClick={handleCellClick}
                />
            ))}
        </div>
    )
};

export default Board;