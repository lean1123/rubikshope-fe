import {
  AccountCircle,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Login from "../../features/auth/components/login/Login";
import Register from "../../features/auth/components/register/Register";
import styles from "./styles.module.css";
import { logout } from "../../features/auth/AuthSlice";

export default function Header() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();

  const openMenu = Boolean(anchorEl);

  const isLoggedInUser = useSelector((state) => state.users.current);

  const isLoggedin = !!isLoggedInUser.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, mess) => {
    if (mess === "backdropClick") {
      e.stopPropagation();
      return;
    } else setOpen(false);
  };

  // Account menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    const logoutAction = logout();
    dispatch(logoutAction);
    handleCloseMenu();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/">
              <AdminPanelSettingsIcon className={styles.admin_icon} />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Video Manager Admin App
          </Typography>
          <NavLink className={styles.link} to="/">
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink className={styles.link} to="/categories">
            <Button color="inherit">Category</Button>
          </NavLink>
          <NavLink className={styles.link} to="/videos">
            <Button color="inherit">Video</Button>
          </NavLink>
          <NavLink className={styles.link} to="/searchPagination">
            <Button color="inherit">Search</Button>
          </NavLink>
          {!isLoggedin && (
            <Button color="inherit" onClick={handleClickOpen}>
              Log In
            </Button>
          )}
          {isLoggedin && (
            <IconButton color="inherit" onClick={handleClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Account menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogContent>
          {!isLogin && (
            <>
              <Register closeDialog={handleClose} />
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
              <Login closeDialog={handleClose} />
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
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
