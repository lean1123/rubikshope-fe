import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

export const useStyles = makeStyles(() => ({
  removeButton: {
    position: "absolute !important",
    top: "-10px",
    right: "-10px",
  },
  button: {
    backgroundColor: theme.palette.primary.light,
    color: "#ffffff",
    padding: theme.spacing(2),
    border: "none",
    borderRadius: "4px",
    width: "100%",
    "&:hover": {
      backgroundColor: "#0d1b6b",
    },
  },
}));
