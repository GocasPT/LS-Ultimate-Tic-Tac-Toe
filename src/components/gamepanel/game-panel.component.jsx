import React, { useState } from "react";
import Board from "../board/board.component";
import "./game-panel.css"

function GamePanel({ player1, player2 }) {
    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [boardData, setBoardData] = useState(Array.from({ length: 9 }, () => (
        {
            value: null, 
            cells: Array.from({ length: 9 }, () => null)
        }
    )));
  
    const handleCellClick = (subBoardIndex, cellIndex) => {
        const updatedBoardData = [...boardData];
        const updatedSubBoard = { ...updatedBoardData[subBoardIndex] }; 

        if (updatedSubBoard.cells[cellIndex] !== null || updatedSubBoard.value) return

        updatedSubBoard.cells[cellIndex] = currentPlayer === player1 ? 'X' : 'O';
        
        // LOGIC: Check if any line is complete to win the sub-board
        /*const linesToWin = [
            // Horizontal lines
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            // Vertical lines
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            // Diagonal lines
            [0, 4, 8], [2, 4, 6]
        ];

        const isSubBoardComplete = linesToWin.some(line => {
            const [a, b, c] = line;
            const cells = updatedSubBoard.cells;
            return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
        });

        if (isSubBoardComplete && updatedSubBoard.value === null) {
            console.log(`Sub-board ${subBoardIndex} is complete by ${currentPlayer}!`);
            updatedBoardData[subBoardIndex].value = currentPlayer;

            const isBoardComplete = linesToWin.some(line => {
                const [a, b, c] = line;
                const board = updatedBoardData;
                return board[a].value && board[a].value === board[b].value && board[b].value === board[c].value;
            })

            if (isBoardComplete) {
                console.log(`${currentPlayer} win!`)
            }
        }*/

        // Check if the selected sub-board is complete
        const isSubBoardComplete = checkSubBoardComplete(updatedSubBoard.cells);
        updatedSubBoard.value = isSubBoardComplete ? currentPlayer : null;

        console.log(updatedBoardData)

        // Determine the next mini-board to continue the game
        const nextSubBoardIndex = determineNextSubBoard(subBoardIndex, updatedBoardData);

        setBoardData(updatedBoardData);
        setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    };

    // Function to check if a sub-board is complete (has a winner)
    const checkSubBoardComplete = (cells) => {
        const linesToWin = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical lines
        [0, 4, 8], [2, 4, 6] // Diagonal lines
        ];
    
        return linesToWin.some(line => {
            const [a, b, c] = line;
            return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
        });
    };
    
    // Function to determine the next mini-board based on opponent's previous move
    const determineNextSubBoard = (subBoardIndex, boardData) => {
        const selectedCellIndex = boardData[subBoardIndex].cells.indexOf(null);
    
        if (selectedCellIndex === -1 || boardData[selectedCellIndex].value) {
        // The selected mini-board is already complete or all cells are occupied
        // Choose the next available mini-board
        for (let i = 0; i < boardData.length; i++) {
            if (!boardData[i].value) {
            return i;
            }
        }
        }
    
        return selectedCellIndex;
    };

    return (
        <div className="GamePanel">
            <h2>Ultimate Tic-Tac-Toe</h2>
            <p>Current Player: {currentPlayer}</p>
            <div className="PlayerNames">
            <div className="Player1">
                <p>{player1}</p>
            </div>
            <div className="Player1">
                <p>{player2}</p>
            </div>
            </div>
            <Board 
                boardData={boardData} 
                onSubBoardClick={handleCellClick}
            />
        </div>
    );
  }
  
export default GamePanel;