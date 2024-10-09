import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LoginIcon from "@mui/icons-material/Login";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TopNav({ setMode, mode }) {
  // authenthication
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  // login
  const handleLoginClick = () => {
    navigate("/login");
  };
  // logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Job Routing
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 15 }} />
            {isMobile ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                {/* login */}
                {user ? (
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="loginout"
                    sx={{ mr: 2 }}
                    onClick={handleLogout}
                  >
                    <Box display="flex" alignItems="center">
                      <LogoutIcon />
                      <span style={{ marginLeft: "8px", fontSize: "0.875rem" }}>
                        Logout
                      </span>
                    </Box>
                  </IconButton>
                ) : (
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="login"
                    sx={{ mr: 2 }}
                    onClick={handleLoginClick}
                  >
                    <LoginIcon />
                  </IconButton>
                )}

                {/* change theme */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="brightness"
                  sx={{ mr: 2 }}
                  onClick={handleThemeToggle}
                >
                  <Brightness4Icon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
