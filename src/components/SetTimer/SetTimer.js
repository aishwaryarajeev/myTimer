import React, { useState } from "react";

import PropTypes from "prop-types";

import Close from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/styles";

import Draggable from "react-draggable";

import { DEFAULT_TIMER_VALUE, ACTION_TYPE } from "../../constants";

import clsx from "clsx";

import CountDownTimer from "../CountDownTimer";

import TimerHandler from "../TimerHandler";

export const useStyles = makeStyles(() => ({
  container: ({ isTimerSet }) => ({
    top: "15%",

    left: "85%",

    position: "absolute",

    backgroundColor: "grey",

    width: "150px",

    height: isTimerSet ? "130px" : "310px",

    zIndex: "99999",
  }),

  closeIconContainer: {
    backgroundColor: "grey",
    height: "33px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  closeIcon: {
    color: "black",
  },

  valueContainer: {
    width: "129px",

    height: "46px",

    backgroundColor: "white",

    margin: "8.3px auto 8.6px",
  },

  valueStyle: {
    fontFamily: "openSans",

    fontWeight: 400,

    fontSize: "34px",

    lineHeight: "46px",

    padding: "1px 0.5px 1px 30px",
  },

  buttonContainer: {
    display: "flex",

    alignItems: "center",

    justifyContent: "space-evenly",
  },

  timerButton: {
    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    height: "26px",

    width: "60px",

    borderRadius: "4px",

    backgroundColor: "grey",

    fontFamily: "openSans",

    fontWeight: 600,

    fontSize: "14px",

    lineHeight: "26.4px",

    color: "white",

    marginBottom: "8px",

    border: "none",
  },

  keypadContainer: {
    display: "flex",

    flexWrap: "wrap",

    justifyContent: "space-evenly",
  },

  keypadButton: {
    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    height: "36px",

    width: "36px",

    borderRadius: "4px",

    backgroundColor: "lightgrey",

    margin: "3px 1px",

    border: "none",

    outline: "none",
  },

  keypadNumber: {
    fontFamily: "openSans",

    fontWeight: 400,

    fontSize: "34px",

    lineHeight: "36px",
  },

  zeroNumber: {
    order: 10,
  },
}));

const SetTimer = ({ handleCloseClicked }) => {
  const [value, setValue] = useState("");

  const [isTimerSet, setTimer] = useState(false);

  const [isTimerReset, setResetTimer] = useState(false);

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const classes = useStyles({ isTimerSet });

  const refactorValue = () => {
    const timerLength = value.length;

    if (timerLength <= 4) {
      switch (timerLength) {
        case 1:
          return `00:0${value}`;

        case 2:
          return `00:${value[0]}${value[1]}`;

        case 3:
          return `0${value[0]}:${value[1]}${value[2]}`;

        case 4:
          return `${value[0]}${value[1]}:${value[2]}${value[3]}`;

        default:
          return DEFAULT_TIMER_VALUE;
      }
    }
  };

  const renderKeypad = () =>
    Array.from({ length: 10 }, (_, x) => (
      <button
        key={x}
        className={clsx(
          `${classes.keypadButton}  ${x === 0 ? classes.zeroNumber : ""}`
        )}
        onClick={() => {
          value.length <= 3 &&
            setValue((previousState) => `${previousState}${x}`);
        }}
        data-testid="keypad"
      >
        <span className={classes.keypadNumber}>{x}</span>
      </button>
    ));

  const renderCountDown = () => {
    const countDownValue = refactorValue();

    return (
      <CountDownTimer
        initialMinute={`${countDownValue[0]}${countDownValue[1]}`}
        initialSeconds={`${countDownValue[3]}${countDownValue[4]}`}
        isTimerReset={isTimerReset}
        setResetTimer={setResetTimer}
        isTimerRunning={isTimerRunning}
      />
    );
  };

  const handleOnClick = (actionType) => {
    switch (actionType) {
      case ACTION_TYPE.SET:
        setTimer(true);

        setIsTimerRunning(true);

        break;

      case ACTION_TYPE.CLEAR:
        setValue("");

        break;

      case ACTION_TYPE.RESET:
        setResetTimer(true);

        break;

      case ACTION_TYPE.TOGGLE:
        setIsTimerRunning(!isTimerRunning);

        break;

      // no default
    }
  };

  return (
    <Draggable>
      <div className={classes.container} data-testid="setTimer">
        <div className={classes.closeIconContainer}>
          <Close onClick={handleCloseClicked} />
        </div>

        <div className={classes.valueContainer}>
          <span className={classes.valueStyle} data-testid="spanElement">
            {!isTimerSet ? refactorValue() : renderCountDown()}
          </span>
        </div>

        <div className={classes.buttonContainer}>
          {isTimerSet ? (
            <>
              <TimerHandler
                data-testid="toggleButton"
                onClickHandler={() => handleOnClick("Toggle")}
                isToggleButton={true}
                isTimerRunning={isTimerRunning}
              />

              <TimerHandler
                data-testid="resetButton"
                onClickHandler={() => handleOnClick("Reset")}
                name={"Reset"}
              />
            </>
          ) : (
            <>
              <TimerHandler
                data-testid="setButton"
                onClickHandler={() => handleOnClick("Set")}
                name={"Set"}
              />

              <TimerHandler
                data-testid="clearButton"
                onClickHandler={() => handleOnClick("Clear")}
                name={"Clear"}
              />
            </>
          )}
        </div>

        {!isTimerSet && (
          <div className={classes.keypadContainer}>{renderKeypad()}</div>
        )}
      </div>
    </Draggable>
  );
};

export default SetTimer;

SetTimer.propTypes = {
  handleCloseClicked: PropTypes.func.isRequired,
};
