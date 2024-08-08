import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

AuthDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
};

function AuthDialog({ open, handleCloseDialog }) {
  const [isLogin, setIsLogin] = useState(true);

  // const handleClose = (e, mess) => {
  //   if (mess === "backdropClick") {
  //     e.stopPropagation();
  //     return;
  //   } else setOpen(false);
  // };

  return (
    <Box>
      <Dialog disableEscapeKeyDown open={open} onClose={handleCloseDialog}>
        <DialogContent>
          {!isLogin && (
            <>
              <Register closeDialog={handleCloseDialog} />
              <Box container justifyContent="flex-end" textAlign="center">
                <Button
                  onClick={() => {
                    setIsLogin(true);
                  }}
                >
                  Already have an account? Sign in
                </Button>
              </Box>
            </>
          )}
          {isLogin && (
            <>
              <Login closeDialog={handleCloseDialog} />
              <Box container justifyContent="flex-end" textAlign="center">
                <Button
                  onClick={() => {
                    setIsLogin(false);
                  }}
                >
                  Already have an account? Sign up
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AuthDialog;
