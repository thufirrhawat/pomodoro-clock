import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Session = ({ sessionLength, setSessionLength }) => {

  const handleDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const handleIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  return (
    <div className="container mt-3">
      <div className="form-group">
        <label id="session-label" className="form-label">
          Session Length
        </label>

        <button
          id="session-decrement"
          className="btn btn-danger mx-2"
          onClick={handleDecrement}
        >
          -
        </button>

        <span id="session-length">{sessionLength}</span>

        <button
          id="session-increment"
          className="btn btn-success mx-2"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Session;
