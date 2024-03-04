import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Cookies from "js-cookie";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favoritesSlice";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText, MenuItem, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { addItem, removeItem } from "../../redux/cartSlice";

const Favorites = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [selectCategory, setSelectCategory] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 150]);
  const [open, setOpen] = React.useState(false);
  const [favoriteStatus, setFavoriteStatus] = React.useState({});
  const cartFromCookies = Cookies.get("favorites");

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites); // Updated selector

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
  };
  console.log(products);
  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  const addToCart = () => {
    if (selectedProduct) {
      dispatch(
        addItem({
          id: selectedProduct._id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
        })
      );
    }
  };

  const getProducts = () => {
    setProducts(JSON.parse(cartFromCookies));
  };

  useEffect(() => {
    if (cartFromCookies)
      getProducts();
  }, [cartFromCookies]);

  useEffect(() => {
    // getProducts();
  }, []);

  return (
    <div>
      <Container>
        <h1>Favorites </h1>

        {favorites?.map((product, index) => {
          console.log(product._id);
          return (
            <Card key={product._id} sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={product.image}
                title={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: {product.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {product.description}
                </Typography>
              </CardContent>
              <CardActions>

                 {/* <IconButton
                  onClick={() => {
                    if (isFavorite(product._id)) {
                      handleRemoveFromFavorites(product._id);
                    } else {
                      handleAddToFavorites(product);
                    }
                  }}
                >
                  <FavoriteIcon
                    color={isFavorite(product._id) ? "error" : "disabled"}
                  />
                </IconButton> */}


                <Button
                  size="small"
                  onClick={() => {
                    setSelectedProduct(product);
                    setOpen(true);
                  }}
                >
                  See Details
                </Button>
              </CardActions>
            </Card>
          );
        })}
        {selectedProduct && (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <h1> {selectedProduct.name}</h1>
                <h2> {selectedProduct.price}</h2>
                <h3> {selectedProduct.amount}</h3>
                <h4> {selectedProduct.category}</h4>
                <h5> {selectedProduct.description}</h5>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addToCart} autoFocus>
                Add to cart
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
