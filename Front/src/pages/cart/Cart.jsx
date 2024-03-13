import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";

import { useDispatch } from "react-redux";
import { removeItem, editItem } from "../../redux/cartSlice";

import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cookieCart = Cookies.get("cart");

  useEffect(() => {
    if (cookieCart) {
      const parsedCart = JSON.parse(cookieCart);
      setCartData(parsedCart);
      updateTotalPrice(parsedCart);
    }
  }, [cookieCart]);

  const updateTotalPrice = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const deleteItem = (id) => {
    const cookieCart = Cookies.get("cart");
    const parsedCookieCart = cookieCart ? JSON.parse(cookieCart) : [];

    const updateCookieCart = parsedCookieCart.filter((item) => item.id !== id);
    console.log("Updating cookies with:", updateCookieCart);

    // Cookies.set("cart", JSON.stringify(updateCookieCart));

    dispatch(removeItem(id));

    const updatedCart = cartData.filter((item) => item.id !== id);

    setCartData(updatedCart);
    updateTotalPrice(updatedCart);

    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleQuantityChange = (id, newQuantity) => {
    // debugger;
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity > 0) {
      const updatedCart = cartData.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartData(updatedCart);
      updateTotalPrice(updatedCart);
      dispatch(editItem({ id, quantity: newQuantity }));
    }
    else {
      dispatch(removeItem(id));
      window.location.reload();
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="cart" style={{ minHeight: 610}}>
      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">סל קניות</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h3 style={{ color: "white", marginRight: "-535px" }}>סה"כ לתשלום : &nbsp;
          <span style={{ color: "#C1121F", fontWeight: "bold" }}>{totalPrice}</span>       ₪</h3>

        {totalPrice > 0 && (<Link to="/Pay" className="btn"
          style={{ marginTop: -70, marginRight: 660 }}
        >
          מעבר לתשלום
        </Link>)}

      </div>
      <Table className="table table-bordered"
        style={{
          maxWidth: 800,
        }}
      >

        <TableHead>
          <TableRow style={{ borderColor: "#C1121F" }} className="table-row">
            <TableCell align="center" style={{ width: 10 }}> תמונה</TableCell>
            <TableCell align="center" style={{ width: 200 }}>שם מוצר</TableCell>
            <TableCell align="center" style={{ width: 85 }}>מחיר</TableCell>
            <TableCell align="center" style={{ width: 85 }}>כמות</TableCell>
            <TableCell align="center" style={{ width: 50 }}>מחיקה</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartData.map((row, index) => (
            <TableRow style={{ borderColor: "#C1121F", borderRadius: 2 }}
              key={row.id}
            >
              <TableCell align="center" style={{ width: 11 }}>
                <img
                  style={{
                    width: "9rem",
                    height: "6rem",
                  }}
                  src={row.image}
                  alt=""
                />
              </TableCell>
              <TableCell align="center" style={{ width: 200 }}>{row.name}</TableCell>
              <TableCell align="center" style={{ width: 85, padding: 1 }}>{row.price} ₪</TableCell>
              <TableCell align="center">

                <TextField
                  id="outlined-basic"
                  type="number"
                  variant="outlined"
                  value={row.quantity}
                  onChange={(e) =>
                    handleQuantityChange(row.id, e.target.value)
                  }
                  sx={{ width: 85, padding: 1 }}
                />
              </TableCell>
              <TableCell align="center">

                <Button
                  onClick={() => {
                    setSelectedProduct(row);
                    handleOpenDialog();
                  }}
                >
                  <i className="fa fa-trash" aria-hidden="true" style={{ color: "#C1121F", fontSize: 25 }}></i>
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete"
        sx={{
          width: '100%', 
          height: '100%', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
        <div className="dialog-delete-border">
          <DialogContent sx={{
            width: 350,
          }}>
            <DialogContentText id="alert-dialog-description"
              sx={{ marginTop: 5, textAlign: "center" }}>

              בטוחים שאתם רוצים להסיר את
              <span style={{ color: "#C1121F", fontWeight: "bold" }}>  {selectedProduct.name} </span>
              מההזמנה שלכם ?
              <br />        </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ marginBottom: 2, marginLeft: 2 }}>
            <button className="btn" onClick={handleCloseDialog} style={{ marginLeft: 15 }}>לא</button>
            <button className="btn" onClick={() => deleteItem(selectedProduct.id)} autoFocus>
              כן
            </button>
          </DialogActions>
        </div>
      </Dialog>

    </div>
  );
}

export default Cart;