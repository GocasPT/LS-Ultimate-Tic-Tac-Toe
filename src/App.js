import { useState } from "react";

import {
  PlaterForm,
  GamePanel
} from "./components"

import "./assets/styles/App.css"


function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameOn, setGameOn] = useState(false)

  const handlePlayerFormSubmit = (player1Name, player2Name) => {
    setPlayer1(player1Name);
    setPlayer2(player2Name);
    setGameOn(true);
  }

  return (
    <div className="App">
      <PlaterForm
        onSubmit={handlePlayerFormSubmit}
      />
      {gameOn ? 
        <GamePanel
          player1={player1}
          player2={player2}
        /> 
        : null}
    </div>
  );
}

export default App;
