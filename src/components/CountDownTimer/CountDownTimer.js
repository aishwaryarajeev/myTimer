import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

const CountDownTimer = ({
  initialMinute,

  initialSeconds,

  isTimerReset,

  setResetTimer,

  isTimerRunning,
}) => {
  const initialState = {
    initialMinute: Number(initialMinute),

    initialSeconds: Number(initialSeconds),
  };

  const [minutes, setMinutes] = useState(initialState.initialMinute);

  const [seconds, setSeconds] = useState(initialState.initialSeconds);

  const [myIntervalId, setMyIntervalId] = useState(null);

  useEffect(() => {
    if (isTimerRunning) {
      setResetTimer(false);

      const myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);

            setSeconds(59);
          }
        }
      }, 1000);

      setMyIntervalId(myIntervalId);

      return () => {
        clearInterval(myInterval);
      };
    } else {
      clearInterval(myIntervalId);
    }
  }, [minutes, seconds, isTimerRunning]);

  useEffect(() => {
    if (isTimerReset) {
      setMinutes(initialState.initialMinute);

      setSeconds(initialState.initialSeconds);
    }
  }, [isTimerReset]);

  return (
    <span>
      {minutes === 0 && seconds === 0 ? (
        "00:00"
      ) : (
        <span>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      )}
    </span>
  );
};

export default CountDownTimer;

CountDownTimer.propTypes = {
  initialMinute: PropTypes.string.isRequired,

  initialSeconds: PropTypes.string.isRequired,

  isTimerReset: PropTypes.bool.isRequired,

  setResetTimer: PropTypes.func.isRequired,

  isTimerRunning: PropTypes.bool.isRequired,
};
