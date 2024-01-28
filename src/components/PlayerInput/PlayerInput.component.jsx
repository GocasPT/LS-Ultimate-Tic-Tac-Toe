import { useState } from 'react';
import PropTypes from 'prop-types';
import './PlayerInput.css';

const PlayerInput = ({ onPlayersSubmit }) => {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (player1Name.trim() !== '' && player2Name.trim() !== '') {
            onPlayersSubmit(player1Name, player2Name);
        } else {
            alert('Please enter names for both players.');
        }
    }

    return (
        <div className="player-input">
        <h2>Enter Player Names</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Player 1:
            <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
            />
            </label>
            <br />
            <label>
            Player 2:
            <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
            />
            </label>
            <br />
            <button type="submit">Start Game</button>
        </form>
        </div>
    )
}

PlayerInput.propTypes = {
    onPlayersSubmit: PropTypes.func.isRequired,
};

export default PlayerInput