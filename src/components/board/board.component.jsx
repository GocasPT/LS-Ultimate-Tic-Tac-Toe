import PropTypes from 'prop-types';
import Cell from "../Cell/Cell.component"
import './Board.css'

const Board = ({ cells, className, onCellClick }) => {
    return (
        <div className={`board ${className}`}>
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