import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Break = ({ breakLength, setBreakLength }) => {
  
  const handleDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  return (
    <div className="container mt-3">
      <div className="form-group">
        <label id="break-label" className="form-label">
          Break Length
        </label>

        <button
          id="break-decrement"
          className="btn btn-danger mx-2"
          onClick={handleDecrement}
        >
          -
        </button>

        <span id="break-length">{breakLength}</span>

        <button
          id="break-increment"
          className="btn btn-success mx-2"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Break;
