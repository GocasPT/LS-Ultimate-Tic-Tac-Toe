import { useState } from 'react';
import Board from '../Board/Board.component';
import PlayerInput from '../PlayerInput/PlayerInput.component';
import './Game.css';

const Game = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [subBoards, setSubBoards] = useState(Array.from({ length: 3 }, () => (
    Array.from({ length: 3}, () => (
      Array.from({ length: 3 }, () => (
        Array(3).fill(null)
      ))
    ))
  )));
  const [mainBoard, setMainBoard] = useState(Array.from({ length: 3 }, () => (
    Array(3).fill(null)
  )));
  const [currentBoard, setCurrentBoard] = useState([null, null]);

  const handleCellClick = (subRow, subCol, cellRow, cellCol) => {
    if (subBoards[subRow][subCol][cellRow][cellCol] === null) {
      const updatedSubBoards = [...subBoards];
      updatedSubBoards[subRow][subCol][cellRow][cellCol] = currentPlayer === player1 ? 'X' : 'O';
      setSubBoards(updatedSubBoards);

      if (determineWinner(updatedSubBoards[subRow][subCol], currentPlayer === player1 ? 'X' : 'O')) {
        if (mainBoard[subRow][subCol] === null) {
          const updatedMainBoard = [...mainBoard];
          updatedMainBoard[subRow][subCol] = currentPlayer === player1 ? 'X' : 'O';
          setMainBoard(updatedMainBoard);

          if (determineWinner(updatedMainBoard, currentPlayer === player1 ? 'X' : 'O')) {
            alert(`${currentPlayer} wins the game!`);
            //TODO: You might want to reset the game here
          }
        }
      }

      switchPlayers();
      //TODO: debug
      if (mainBoard[cellRow][cellCol] === null) setCurrentBoard([cellCol, cellRow]);
      else setCurrentBoard([null, null]);
    }
  }

  const determineWinner = (currentBoard, player) => {
    return (
      checkRows(currentBoard, player) ||
      checkColumns(currentBoard, player) ||
      checkDiagonals(currentBoard, player)
    );
  };

  const checkRows = (currentBoard, player) => {
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[i][0] === player &&
        currentBoard[i][1] === player &&
        currentBoard[i][2] === player
      ) {
        return true;
      }
    }
    return false;
  };

  const checkColumns = (currentBoard, player) => {
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[0][i] === player &&
        currentBoard[1][i] === player &&
        currentBoard[2][i] === player
      ) {
        return true;
      }
    }
    return false;
  };

  const checkDiagonals = (currentBoard, player) => {
    if (
      currentBoard[0][0] === player &&
      currentBoard[1][1] === player &&
      currentBoard[2][2] === player
    ) {
      return true;
    }
    if (
      currentBoard[0][2] === player &&
      currentBoard[1][1] === player &&
      currentBoard[2][0] === player
    ) {
      return true;
    }
    return false;
  };

  const switchPlayers = () => {
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  }

  const startGame = (player1Name, player2Name) => {
      setPlayer1(player1Name);
      setPlayer2(player2Name);
      setCurrentPlayer(Math.random() < 0.5 ? player1Name : player2Name);
  }

  return (
    <div className="game-container">
      <h1>Ultimate Tic-Tac-Toe</h1>
      {!currentPlayer ? (
        <PlayerInput
          onPlayersSubmit={(player1Name, player2Name) =>
            startGame(player1Name, player2Name)
          }
        />
      ) : (
        <div className='game'>
          <h2>{`${currentPlayer}'s turn`}</h2>
          <div className='game-board'>
          {subBoards.map((subBoardsRow, rowIndex) => (
            <div className="board-row" key={rowIndex} >
              {subBoardsRow.map((subBoard, boardIndex) => (
                <Board
                  key={`${rowIndex}-${boardIndex}`}
                  isDisabled={currentBoard[0] !== null && (currentBoard[0] !== boardIndex || currentBoard[1] !== rowIndex)}
                  claimedBy={mainBoard[rowIndex][boardIndex]}
                  cells={subBoard}
                  onCellClick={(cellRow, cellCol) => (
                    handleCellClick(rowIndex, boardIndex, cellRow, cellCol)
                  )}
                />
              ))}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game