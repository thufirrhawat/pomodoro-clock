import React, { useState, useEffect, useRef } from 'react';
import Break from './Break';
import Session from './Session';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const playBeep = () => {
    audioRef.current.play();
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            playBeep();
            if (isSession) {
              setIsSession(false);
              return breakLength * 60;
            } else {
              setIsSession(true);
              return sessionLength * 60;
            }
          }
        });
      }, 1000);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsSession(true);
    setTimeLeft(sessionLength * 60);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    if (!isRunning && isSession) {
      setTimeLeft(sessionLength * 60);
    } else if (!isRunning && !isSession) {
      setTimeLeft(breakLength * 60);
    }
  }, [sessionLength, breakLength, isSession]);

  return (
    <div className="container text-center mt-3">
      <h2 id="timer-label">{isSession ? 'Session' : 'Break'}</h2>
      <h1 id="time-left">{formatTime(timeLeft)}</h1>
      <button
        id="start_stop"
        className="btn btn-primary mx-2"
        onClick={handleStartStop}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        id="reset"
        className="btn btn-danger mx-2"
        onClick={handleReset}
      >
        Reset
      </button>
      <div className="d-flex justify-content-center mt-4">
        <Break breakLength={breakLength} setBreakLength={setBreakLength} />
        <Session sessionLength={sessionLength} setSessionLength={setSessionLength} />
      </div>
      <audio
        id="beep"
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        preload="auto"
      />
    </div>
  );
};

export default Timer;
