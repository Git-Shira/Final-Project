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
const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [selectCategory, setSelectCategory] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 150]);
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false); // Add this state
  const [favoriteStatus, setFavoriteStatus] = React.useState({});

 
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
    setFavoriteStatus({
      ...favoriteStatus,
      [product._id]: true,
    });
  };

  const handleRemoveFromFavorites = (product) => {
    dispatch(removeFromFavorites(product._id));
    setFavoriteStatus({
      ...favoriteStatus,
      [product._id]: false,
    });
  };

  const addToCart = () => {
    if (selectedProduct) {
      dispatch(
        addItem({
          id: selectedProduct._id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
          filter:selectedProduct.filter,
        })
      );
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products/all");
      console.log(response);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (event) => {
    setSelectCategory(event.target.value);
  };

  const handleChangePrice = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div>
      <Container>
        <h1>Products</h1>
        <Box sx={{ width: 300 }}>
          <Typography id="input-slider" gutterBottom>
            Price range
          </Typography>
          <Slider
            value={priceRange}
            onChange={handleChangePrice}
            aria-label="Price range"
            defaultValue={20}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={150}
          />
        </Box>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          value={selectCategory}
          placeholder="Select category"
        >
          <MenuItem value={selectCategory}>Select category</MenuItem>
          <MenuItem value={""}>All</MenuItem>
          <MenuItem value={"10"}>Ten</MenuItem>
          <MenuItem value={"20"}>Twenty</MenuItem>
          <MenuItem value={"30"}>Thirty</MenuItem>
        </Select>

        {products
          .filter(
            (product) =>
              (selectCategory === ""
                ? true
                : product.category === selectCategory) &&
              product.price >= priceRange[0] &&
              product.price <= priceRange[1]
          )
          .map((product, index) => {
            return (
              <Card key={product._id} sx={{ maxWidth: 345 }}>
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
                  <IconButton
                    onClick={() => {
                      if (favoriteStatus[product._id]) {
                        handleRemoveFromFavorites(product);
                      } else {
                        handleAddToFavorites(product);
                      }
                    }}
                  >
                    <FavoriteIcon
                      color={favoriteStatus[product._id] ? "error" : "disabled"}
                      fontSize="small"
                    />
                  </IconButton>{" "}
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

export default Products;

