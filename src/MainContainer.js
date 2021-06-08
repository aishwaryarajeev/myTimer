import React, { useState } from "react";
import SetTimer from "./components/SetTimer";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import timerIcon from "./assets/timer-icon.jpeg";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  toolButton: {
    border: "0px",
    margin: "0 10px",
    cursor: "pointer",
    height: "60px",
  },
  tooltip: {
    display: "flex",
    marginBottom: "5px",
    marginLeft: "18px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "black",
    width: "auto",
    height: "31px",
    fontSize: "12px",
    border: "1px solid",
    fontFamily: "openSans",
    fontWeight: 400,
    lineHeight: "16px",
    borderRadius: "4px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
  },
}));

const MainContainer = () => {
  const classes = useStyles();

  const [timerPopUpVisible, setTimerPopUpVisible] = useState(false);

  const handleCloseClicked = () => {
    setTimerPopUpVisible(false);
  };

  return (
    <div className={classes.root}>
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        title={"Set Timer"}
        placement="top-start"
      >
        <button
          className={classes.toolButton}
          type="button"
          data-testid="timerButton"
          onClick={() => setTimerPopUpVisible(true)}
        >
          <img src={timerIcon} width="50px" height="auto" alt="Set Timer" />
        </button>
      </Tooltip>

      {timerPopUpVisible && (
        <SetTimer handleCloseClicked={handleCloseClicked} />
      )}
    </div>
  );
};

export default MainContainer;
