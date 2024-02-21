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
import { IconButton, TextField } from "@mui/material";
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [selectCategory, setSelectCategory] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 150]);
  const [open, setOpen] = React.useState(false);
  const [selectedButton, setSelectedButton] = React.useState([]);
  const [sreach, setSreach] = React.useState("");
  const [isFavorite, setIsFavorite] = React.useState(false); // Add this state
  const [favoriteStatus, setFavoriteStatus] = React.useState({});
  const categorys = ["All", "Ten", "Twenty", "Thirty"];


  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites); // Updated selector

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));

  };

  const addShoppingCart = (products) => {
    debugger;
    dispatch(
      addItem({
        id: products._id,
        name: products.name,
        price: products.price,
        image: products.image,
        quantity: 1,
      })
    );
  };

  const addToCart = () => {
    debugger;
    if (selectedProduct) {
      dispatch(
        addItem({
          id: selectedProduct._id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
          quantity: 1,
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

  const resetFilter = () => {
    setSelectedButton([]);
    setSelectCategory("");
    setPriceRange([0, 150]);
    setSreach("");
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (category) => {
    if (selectedButton.includes(category)) {
      setSelectedButton(selectedButton.filter((item) => item !== category));
      setSelectCategory("");
    } else {
      setSelectedButton([...selectedButton, category]);
      setSelectCategory(category);
    }

    // setSelectCategory(category);
  };
  const isButtonSelected = (category) => {
    return selectedButton.includes(category);
  };

  const handleChangePrice = (event, newValue) => {
    setPriceRange(newValue);
  };

  const isFavorite = (productId) => {
    debugger;
    return favorites.some((favorite) => favorite._id === productId);
  };
  console.log(isFavorite);

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
        <TextField
          id="outlined-basic"
          label="Search"
          type={"text"}
          variant="outlined"
          onChange={(e) => setSreach(e.target.value)}
        />
        <Button
          onClick={() => {
            resetFilter();
          }}
        >
          Reset
        </Button>
        {categorys.map((category, index) => {
          return (
            <Button
              key={index}
              onClick={() => {
                handleChange(category);
              }}
              sx={{
                backgroundColor: isButtonSelected(category) ? "black" : "red", // Change to red when selected
                color: isButtonSelected(category) ? "white" : "black",
              }}
            >
              {category}
            </Button>
          );
        })}

        {products
          .filter(
            (product) =>
              (selectCategory === ""
                ? true
                : product.category === selectCategory) &&
              product.price <= priceRange[1] &&
              product.name.toLowerCase().startsWith(sreach.toLowerCase())
          )
          .map((product, index) => {
            console.log(product._id);
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
                  <IconButton onClick={() => handleAddToFavorites(product)}>
                    <FavoriteIcon
                      color={isFavorite(product._id) ? "error" : "disabled"}
                    />
                  </IconButton>
                  <Button
                    size="small"
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpen(true);
                    }}
                  >
                    See Details
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      addShoppingCart(product);
                    }}
                  >
                    <ShoppingCartIcon />
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

