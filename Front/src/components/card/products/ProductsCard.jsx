import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Edit from "../../../pages/admin/management/edit/Edit";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSuccess = () => {
    // Close the dialog
    setIsEditDialogOpen(false);

    // Refresh the data
    // If you are fetching products from an API, call that function here.
    fetchProducts();
  };

  return (
    <div>
      {/* <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.image}
          title={product.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {product.price}
          </Typography> */}
      {/* <Typography variant="body2" color="text.secondary">
            Amount: {product.amount}
          </Typography> */}
      {/* <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleEditDialogOpen(product)}>
            Edit
          </Button>
          <Button size="small" onClick={handleClickOpen}>
            Delete
          </Button>
        </CardActions>
      </Card> */}
                  <div data-aos="zoom-in">
      <div className="box">
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
        <h5 style={{ marginTop: 5 }}>{product.name}</h5>

        {/* <span className="span"> {product.price} ₪</span> */}
        <br />
        <div >
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
          // width: '900px', // רוחב מרבי
          // height: '800px', // גובה מרבי
          width: '100%', // רוחב מלא
          height: '100%', // גובה מלא
          display: 'flex',
          justifyContent: 'center', // מרכז אופקי
          alignItems: 'center', // מרכז אנכי 
        }}
      >
        <div className="dialog-delete-border">
        <DialogContent sx={{
          height: 150,
        }}>
          <DialogContentText id="alert-dialog-description"
            sx={{ marginTop: 5, textAlign: "center" }}>
            <Container>
              האם אתה בטוח שברצונך למחוק את המוצר הזה?              </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ marginBottom: 2, marginLeft: 2 }}>
          <button className="btn" onClick={handleClose}
          style={{marginLeft:15}}>ביטול</button>
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
    </div>
  );
};

export default ProductsCard;
