import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  title: {
    color: "#dfe1f9",
  },
}));

function Nocoppyright() {
  const classes = useStyles();
  return (
    <div className={classes.title}>
      © Copyright belongs to Rubik Shop | SINCE 2010
    </div>
  );
}

export default Nocoppyright;
