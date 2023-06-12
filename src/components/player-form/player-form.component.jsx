import React,  { useState } from "react";
import "./player-form.component.css"

function PlayerForm({ onSubmit }) {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    const handlePlayer1Change = (e) => {
        setPlayer1(e.target.value);
    };

    const handlePlayer2Change = (e) => {
        setPlayer2(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (player1 !== '' && player2 !== '') {
            onSubmit(player1, player2);
        }
    };

    return (
        <div className="PlayerForm">
            <h2>Player Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Player 1:
                    <input type="text" value={player1} onChange={handlePlayer1Change} />
                </label>
                <label>
                    Player 2:
                    <input type="text" value={player2} onChange={handlePlayer2Change} />
                </label>
                <button type="submit">Start Game</button>
            </form>
        </div>
    )
};

export default PlayerForm;