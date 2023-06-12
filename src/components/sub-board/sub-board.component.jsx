import React from "react";
import Cell from "../cell/cell.component"

//import ""

function SubBoard ({ subBoard, index, disable, onCellClick}) {
    const handleCellClick = (subBoardIndex, cellIndex) => {
        onCellClick(subBoardIndex, cellIndex);
    };

    return (
        <div className={`SubBoard ${disable ? 'disable' : ''}`} id={index}>
          {subBoard.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              value={cell === null ? "" : cell}
              onClick={() => handleCellClick(index, cellIndex)}
            />
          ))}
        </div>
      );
}

export default SubBoard;