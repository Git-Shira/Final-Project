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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";
const ProductsCard = ({ handleEditDialogOpen, product }) => {
  const [open, setOpen] = React.useState(false);
  console.log("product", product);

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
      console.log(response.data);
      alert("המוצר נמחק בהצלחה");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price :{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Amount : {product.amount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category : {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description : {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEditDialogOpen}>
            Edit
          </Button>
          <Button size="small" onClick={handleClickOpen}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Container>Are you sure you want to delete this product?</Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteProduct} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsCard;
