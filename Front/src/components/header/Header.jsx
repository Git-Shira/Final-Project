import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Popover } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

import logo from "./logo.png";

import "./Header.css";

const Header = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [lengthFavorite, setLengthFavorite] = React.useState([]);
  const [admin, setAdmin] = React.useState(false);

  const [anchorEl, setAnchorEl] = useState(null); // State for the Popover
  const [anchorElFavorite, setAnchorElFavorite] = useState(null); // State for the Popover
  const [favoriteLeght, setFavoriteLeght] = useState(0);
  const [permissions, setPermissions] = useState([]); // State for the Popover
  const [dataFavorite, setDataFavorite] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const dispatch = useDispatch();
  const userConnected = useSelector((state) => state.user.isAuthenticating);
  const favorites = useSelector((state) => state.favorites.favorites);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const userCookies = Cookies.get("user");
  const cartCookies = Cookies.get("cart");
  const cartFromCookies = Cookies.get("favorites");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cartCookies) {
      setCartLength(JSON.parse(cartCookies));
    }
  }, [cartCookies]);

  useEffect(() => {
    if (cartFromCookies) {
      setLengthFavorite(JSON.parse(cartFromCookies));
    }
  }, [cartFromCookies]);

  useEffect(() => {
    console.log(cartCookies);
    setFavoriteLeght(favorites.length);
    setDataFavorite(favorites);
  }, [favorites]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem("user");
    Cookies.remove("user", { path: "/" }); // Clear the user cookie
    Cookies.remove("cart", { path: "/" });
    Cookies.remove("favorites", { path: "/" });

    navigate("/");
    // Refresh the page
    window.location.reload();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the Popover
  };
  const handleMenuClose = () => {
    setAnchorEl(null); // Close the Popover
  };

  const handleMenuClickFavorite = (event) => {
    if (isPopoverOpen) {
      // Close the popover if it's open
      setIsPopoverOpen(false);
    } else {
      // Open the popover
      setAnchorElFavorite(event.currentTarget);
      setIsPopoverOpen(true);
    }
  };

  useEffect(() => {
    if (userCookies) {
      // debugger;
      const parsedCookies = JSON.parse(userCookies); // Ensure this parsing is correct
      setIsLogin(true);

      setPermissions(parsedCookies.permission); // Set permissions correctly after parsing

      if (parsedCookies.permission === "admin") {
        // Direct comparison without JSON.stringify
        setAdmin(true);
      }
    }
  }, [userCookies]);
  console.log(lengthFavorite.length);

  return (
    <Box
      className="header"
    >
      <AppBar
        sx={{ background: "black", color: "white", width: "100%" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, padding: 1, marginRight: -3 }}>
            <Link to={"/"}>
              <img src={logo} alt="" sx={{ marginRight: -20, marginTop: 5 }} />
            </Link>
          </Typography>
          <Typography variant="h6" component="div" className="nav" sx={{ flexGrow: 0, marginRight: 3 }}>
            <Link to={"/"} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>בית</Link>
          </Typography>
          <Typography variant="h6" component="div" className="nav" sx={{ flexGrow: 0, marginRight: 3 }}>
            <Link to={"/Menu"} className={`nav-link ${location.pathname === '/Menu' ? 'active' : ''}`}>תפריט</Link>
          </Typography>
          <Typography variant="h6" component="div" className="nav" sx={{ flexGrow: 0, marginRight: 3 }}>
            <Link to={"/Cart"} className={`nav-link ${location.pathname === '/Cart' ? 'active' : ''}`}>
              סל קניות
              {cartLength.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 26,
                    bgcolor: "#C1121F",
                    color: "white",
                    fontSize: "10px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 9
                  }}
                >
                  {cartLength.length}
                </Box>
              )}
            </Link>
          </Typography>
          <Typography variant="h6" component="div" className="nav" sx={{ flexGrow: 0, marginRight: 3 }}>
            <Link to={"/Branches"} className={`nav-link ${location.pathname === '/Branches' ? 'active' : ''}`}>סניפים
            </Link>

          </Typography>
          <Typography variant="h6" component="div" className="nav" sx={{ flexGrow: 1, marginRight: 3 }}>
            <Link to={"/About"} className={`nav-link ${location.pathname === '/About' ? 'active' : ''}`}>אודותינו</Link>
          </Typography>

          {isLogin ? (
            <>
              <Link to={"/favorites"}>
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  onClick={handleMenuClickFavorite}
                  sx={{ marginRight: -10, flex: 10, '& .MuiSvgIcon-root': { fontSize: 32, color: "white" } }}
                >
                  {/* <FavoriteIcon /> */}
                  <FavoriteBorderOutlinedIcon />

                  {lengthFavorite.length > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -1,
                        bgcolor: "#C1121F",
                        color: "white",
                        fontSize: "10px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 4
                      }}
                    >
                      {lengthFavorite.length}
                      {/* {favorites.length} */}
                    </Box>
                  )}
                </IconButton>
              </Link>

              <IconButton
                color="inherit"
                aria-haspopup="true"
                onClick={handleMenuClick}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>

              {admin ? (
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleMenuClose}
                  sx={{ marginTop: 3, marginLeft: 3.5 }}
                >
                  <List>
                    <ListItem button component={Link} to="/Admin/Management" sx={{ textAlign: "right" }}>
                      <ListItemText primary="מוצרים" />
                    </ListItem>
                    <ListItem button component={Link} to="/Admin/TableAdmin" sx={{ textAlign: "right" }}>
                      <ListItemText primary="הזמנות" />
                    </ListItem>
                    <ListItem button component={Link} to="/Admin/ViewUsers" sx={{ textAlign: "right" }}>
                      <ListItemText primary="לקוחות" />
                    </ListItem>
                    <ListItem button onClick={handleLogout} sx={{ textAlign: "right" }}>
                      <ListItemText primary="התנתקות" />
                    </ListItem>
                  </List>
                </Popover>
              ) : (
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleMenuClose}
                  sx={{ marginTop: 3, marginLeft: 3.5 }}
                >
                  <List>
                    <ListItem button component={Link} to="/user/profile" sx={{ textAlign: "right" }}>
                      <ListItemText primary="הפרופיל שלי" />
                    </ListItem>
                    <ListItem button component={Link} to="/user/edit" sx={{ textAlign: "right" }}>
                      <ListItemText primary="עריכת פרטים" />
                    </ListItem>
                    <ListItem button onClick={handleLogout} sx={{ textAlign: "right" }}>
                      <ListItemText primary="התנתקות" />
                    </ListItem>
                  </List>
                </Popover>
              )}
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ marginLeft: 2 }}>
                <Link to={"/SignUp"} className="nav-link2">הרשמה</Link>
              </Button>
              <Button color="inherit">
                <Link to={"/SignIn"} className="nav-link2">התחברות</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;