import * as React from "react";
import { useEffect } from "react";
import axios from "axios";

import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";

import Edit from "../../../pages/admin/management/edit/Edit";

import AOS from 'aos';

import "./ProductsCard.css";

const ProductsCard = ({ product, key, fetchProducts }) => {
  const [open, setOpen] = React.useState(false);
  const [editProductId, setEditProductId] = React.useState(null); // State to store the ID of the product to be edited
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

  const handleEditDialogOpen = (productId) => {
    setEditProductId(productId); // Set the product ID to be edited
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditProductId(null); // Clear the product ID when the dialog is closed
    setIsEditDialogOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/delete/${product._id}`
      );
      alert("המוצר נמחק בהצלחה");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSuccess = () => {
    // Close the dialog
    setIsEditDialogOpen(false);

    // Refresh the data
    fetchProducts();
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div >
        <div className="box-admin" data-aos="zoom-in" 
        style={{
            background:(product.show === 1) ? "white" : "gray",
            borderColor:(product.show === 1) ? "#C1121F" : "black"
        }}>
          {/* <IconButton className="eye"
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpen(true);
                      }}>
                      <Visibility />
                    </IconButton> */}

          {/* <IconButton
                      className="heart"
                      onClick={() => {
                        if (!user) {
                          //  alert("אינך מחובר לחשבון");
                          handleOpenIt();
                        }
                        else
                          handleFavoriteToggle(product);

                      }}
                    >
                      <FavoriteIcon
                        color={isFavorite(product._id) ? "error" : "disabled"}
                      />
                    </IconButton> */}

          <img src={product.image} alt={product.name} />
          <div style={{ height: 20, alignItems: "center", margin: 0 }}>
            <h5> {product.name}</h5>
          </div>
          {/* <span className="span"> {product.price} ₪</span> */}
          <br />
          <div style={{ marginTop: 8 }}>
            <button className="btn"
              onClick={() => {
                handleEditDialogOpen(product)
              }}
              style={{
                justifyContent: "space-evenly",
                marginTop: 0, marginBottom: 0, marginRight: 17, marginLeft: 17
              }}>
              עריכה</button>
            <button className="btn"
              onClick={
                handleClickOpen
              }
              style={{
                justifyContent: "space-evenly",
                marginTop: 0, marginBottom: 0, marginRight: 17, marginLeft: 17
              }}>
              מחיקה</button>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-delete"
        sx={{
          width: '100%', 
          height: '100%', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        <div className="dialog-delete-border">
          <DialogContent sx={{
            height: 150,
          }}>
            <DialogContentText id="alert-dialog-description"
              sx={{
                marginTop: 5, textAlign: "center", width: 350,
              }}>
              <Container>
                האם את/ה בטוח/ה שברצונך למחוק את
                <span style={{ color: "#C1121F", fontWeight: "bold" }}>  {product.name} </span>
                מרשימת המוצרים ?
              </Container>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ marginBottom: 2, marginLeft: 2 }}>
            <button className="btn" onClick={handleClose}
              style={{ marginLeft: 15 }}>ביטול</button>
            <button className="btn" onClick={deleteProduct} autoFocus>
              מחק
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={isEditDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Edit product={product} handleEditSuccess={handleEditSuccess} />
        </DialogContent>
      </Dialog>
    </div >
  );
};

export default ProductsCard;