import React from "react";

import { makeStyles } from "@material-ui/styles";

import STOP_ICON from "../../assets/pause-icon.png";
import START_ICON from "../../assets/play-icon.png";

import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  timerButton: {
    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    height: "26px",

    width: "60px",

    borderRadius: "4px",

    backgroundColor: "white",

    fontFamily: "openSans",

    fontWeight: 600,

    fontSize: "14px",

    lineHeight: "26.4px",

    color: "black",

    marginBottom: "8px",

    border: "none",
  },

  playerImg: {
    marginRight: "5px",
    marginTop: "0.5px",
    width: "15px",
    height: "15px",
  },
}));

const TimerHandler = ({
  onClickHandler,

  name,

  isTimerRunning,

  isToggleButton,
}) => {
  const classes = useStyles();

  return (
    <button className={classes.timerButton} onClick={onClickHandler}>
      {isToggleButton ? (
        isTimerRunning ? (
          <>
            <img src={STOP_ICON} alt="Stop" className={classes.playerImg} />{" "}
            <span>Stop</span>
          </>
        ) : (
          <>
            <img src={START_ICON} alt="Start" className={classes.playerImg} />

            <span>Start</span>
          </>
        )
      ) : (
        ""
      )}

      {name}
    </button>
  );
};

export default TimerHandler;

TimerHandler.propTypes = {
  onClickHandler: PropTypes.func.isRequired,

  name: PropTypes.string,

  isToggleButton: PropTypes.bool,

  isTimerRunning: PropTypes.bool,
};

TimerHandler.defaultProps = {
  name: "",

  isToggleButton: false,

  isTimerRunning: false,
};
