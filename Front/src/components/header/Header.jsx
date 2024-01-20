import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Divider } from "@mui/material";
import { Popover } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [lengthCart, setLengthCart] = React.useState([]);
  const cart = useSelector((state) => state.cart.item);
  const [anchorEl, setAnchorEl] = useState(null); // State for the Popover
  const dispatch = useDispatch();
  const userConnected = useSelector((state) => state.user.isAuthenticating);
  const user = useSelector((state) => state.user.user);
  const userCookies = Cookies.get("user");
  const cartCookies = Cookies.get("cart");
  useEffect(() => {
    if (cartCookies) {
      const cart = JSON.parse(cartCookies);
      setLengthCart(cart);
      // setLengthCart(JSON.parse(cartCookies?.items));
    }
  }, [cartCookies]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    Cookies.remove("user"); // Clear the user cookie
    // Add any other cleanup logic if needed
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the Popover
  };
  const handleMenuClose = () => {
    setAnchorEl(null); // Close the Popover
  };
  useEffect(() => {
    if (userCookies) {
      setIsLogin(true);
    }
  }, [userCookies]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/"}>בית</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/Products"}>מוצרים</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/Cart"}>
              <ShoppingCartIcon />
              {cart.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 3,
                    bgcolor: "red",
                    color: "white",
                    fontSize: "10px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {cart.length}
                </Box>
              )}
            </Link>
          </Typography>
          <FavoriteIcon />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {isLogin ? (
            <>
              <IconButton
                color="inherit"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <PersonIcon />
              </IconButton>
              {userCookies?.permission === "admin" ? (
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleMenuClose}
                >
                  <List>
                    <ListItem button component={Link} to="/Admin/Management">
                      <ListItemText primary="עריכת מוצרים" />
                    </ListItem>
                    <ListItem button component={Link} to="/Admin/TableAdmin">
                      <ListItemText primary="הזמנות" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="התנתקות" />
                    </ListItem>
                  </List>
                </Popover>
              ) : (
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleMenuClose}
                >
                  <List>
                    <ListItem button component={Link} to="/user">
                      <ListItemText primary="הפרופיל שלי" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="התנתקות" />
                    </ListItem>
                  </List>
                </Popover>
              )}
            </>
          ) : (
            <>
              <Button color="inherit">
                {" "}
                <Link to={"/SingIn"}>התחברות</Link>
              </Button>
              <Button color="inherit">
                {" "}
                <Link to={"/SignUp"}>הרשמה</Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
