

import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import { Link as RouterLink, NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "../theme";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: "none",
  marginRight: theme.spacing(2),
  fontWeight: 500,
  fontSize: "1rem",
  transition: "color 0.2s, background 0.2s",
  borderRadius: 6,
  padding: "6px 12px",
  '&.active': {
    background: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  '&:hover': {
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    textShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },
}));


const NavBar = () => {
  const { user } = useContext(AuthContext);
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar position="sticky" color="primary" elevation={4} sx={{ mb: 3, borderRadius: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
        >
          Polling App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ ml: 1, mr: 2 }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <StyledNavLink to="/polls">Polls</StyledNavLink>
          {(!user || !user.user_id) && (
            <>
              <StyledNavLink to="/login">Login</StyledNavLink>
              <StyledNavLink to="/register">Register</StyledNavLink>
            </>
          )}
          {user && user.user_id && (
            <>
              <Button color="inherit" sx={{ fontWeight: 600, mr: 1 }} disabled>
                {user.username}
              </Button>
              <StyledNavLink to="/logout">Logout</StyledNavLink>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
