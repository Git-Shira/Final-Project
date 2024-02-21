import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem, editItem } from "../../redux/cartSlice";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Cart() {
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
    dispatch(removeItem(id));
    handleCloseDialog();
    const updatedCart = cartData.filter((item) => item.id !== id);
    setCartData(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleQuantityChange = (id, newQuantity) => {
    debugger;
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity >= 0) {
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
  };


  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">שם מוצר</TableCell>
              <TableCell align="right">תמונה</TableCell>
              <TableCell align="right">מחיר</TableCell>
              <TableCell align="right">כמות</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartData.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={row.image}
                    alt=""
                  />
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">

                  <TextField
                    type="number"
                    variant="outlined"
                    value={row.quantity}
                    onChange={(e) =>
                      handleQuantityChange(row.id, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      setSelectedProduct(row);
                      handleOpenDialog();
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>סה"כ לתשלום: {totalPrice}</h3>
      <Button variant="contained" to="/Pay" component={Link}>
        תשלום
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title">האם אתה בטוח?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            האם אתה בטוח שברצונך למחוק את המוצר?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>לא</Button>
          <Button onClick={() => deleteItem(selectedProduct.id)} autoFocus>
            כן
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
