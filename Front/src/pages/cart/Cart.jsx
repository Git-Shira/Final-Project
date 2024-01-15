import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItem, editItem } from "../../redux/cartSlice";
import { Dialog } from "@mui/material";
import { Button } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
export default function Cart() {
  const [quantityArray, setQuantityArray] = React.useState([]);
  const [allProducts, setAllProducts] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDialog = (product) => {
    debugger;
    setSelectedProduct(product);

    setOpen(true);
  };
  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 365, secure: true });
    const cookieCart = Cookies.get("cart");
    console.log("cookieCart", cookieCart);
  }, [cart]);

  const deleteItem = (item) => {
    console.log("cart", item);
    dispatch(removeItem(item));
  };
  useEffect(() => {
    setAllProducts(cart.item);
    setTotalPrice(cart.totalAmount);

    setQuantityArray(cart.item.map((item) => item.quantity)); //Inlialize quantity sates
  }, [cart.item]);

  const handleQuantityChange = (index, item, newQuantity) => {
    if (newQuantity >= 0) {
      const newQuantityArray = [...quantityArray];
      newQuantityArray[index] = newQuantity;
      setQuantityArray(newQuantityArray);
      dispatch(editItem({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">שם מוצר</TableCell>
              <TableCell align="right"> תמונה</TableCell>
              <TableCell align="right">מחיר</TableCell>
              <TableCell align="right">כמות</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    src={row.image}
                    alt=""
                  />
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleOpenDialog(row)}>
                    {" "}
                    <DeleteIcon color="red" />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleQuantityChange(index, row, quantityArray[index] - 1)
                    }
                  >
                    -
                  </Button>
                  <TextField
                    id="outlined-basic"
                    type={"number"}
                    variant="outlined"
                    value={quantityArray[index]}
                    placeholder={row.quantity}
                    onChange={(e) => handleQuantityChange(e, index, row)}
                  />

                  <Button
                    variant="contained"
                    onClick={() =>
                      handleQuantityChange(index, row, quantityArray[index] + 1)
                    }
                  >
                    +
                  </Button>
                </TableCell>
                {selectedProduct && (
                  <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {`האם אתה בטוח שברצונך למחוק את המוצר ${selectedProduct.name}?`}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">

                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>לא</Button>
                      <Button
                        onClick={() => deleteItem(selectedProduct)}
                        autoFocus
                      >
                        כן
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>סה"כ לתשלום : {totalPrice}</h3>
      <Button variant="contained" to="/Pay" component={Link}>
        תשלום{" "}
      </Button>
    </div>
  );
}
