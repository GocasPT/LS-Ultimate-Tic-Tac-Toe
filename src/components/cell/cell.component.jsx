import PropTypes from 'prop-types';
import './Cell.css'

const Cell = ({ value, onClick }) => {
    return (
        <button className="cell" onClick={onClick} disabled={value !== null}>
            {value}
        </button>
    );
};

Cell.prototype = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default Cell;