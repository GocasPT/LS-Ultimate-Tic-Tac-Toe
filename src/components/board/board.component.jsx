import PropTypes from 'prop-types';
import Cell from "../Cell/Cell.component"
import './Board.css'

const Board = (props) => {
    const { cells, isDisabled, claimedBy, onCellClick } = props;

    return (
        <div
            className={`
                board
                ${isDisabled ? 'disable' : ''}
                ${claimedBy !== null ? `${claimedBy}-claimed` : ''}`}
        >
            {cells.map((cellsRow, rowIndex) => (
                <div className='cell-row' key={rowIndex}>
                    {cellsRow.map((cell, cellIndex) => (
                        <Cell
                            key={`${rowIndex}-${cellIndex}`}
                            value={cell}
                            onClick={() => onCellClick(rowIndex, cellIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

Board.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    onCellClick: PropTypes.func.isRequired,
  };

export default Board;