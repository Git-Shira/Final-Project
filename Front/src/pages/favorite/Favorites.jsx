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
import { Visibility } from "@mui/icons-material";
import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

const Favorites = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [selectCategory, setSelectCategory] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 150]);
  const [open, setOpen] = React.useState(false);
  const [favoriteStatus, setFavoriteStatus] = React.useState({});
  const cartFromCookies = Cookies.get("favorites");

  const [getAllFavorites, setGetAllFavorites] = React.useState([]);

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


  const addShoppingCart = (products) => {
    dispatch(
      addItem({
        id: products._id,
        name: products.name,
        price: products.price,
        image: products.image,
        quantity: 1,
        filter: products.filter
      })
    );
  };

  const addToCart = () => {
    if (selectedProduct) {
      dispatch(
        addItem({
          id: selectedProduct._id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
          filter: selectedProduct.filter,
          quantity: 1,
        })
      );
    }
  };

  const getProducts = () => {
    debugger;
    if (cartFromCookies)
      setProducts(JSON.parse(cartFromCookies));
  };
  useEffect(() => {
    if (cartFromCookies) {
      getProducts();
    }
    console.log(products);
  }, [cartFromCookies]);

  useEffect(() => {
    getProducts();
  }, []);

  const isFavorite = (productId) => {
    return favorites.some((favorite) => favorite._id === productId);
  };
  const handleFavoriteToggle = (product) => {
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite._id === product._id
    );
    if (isAlreadyFavorite) {
      dispatch(removeFromFavorites(product._id));
      getAllFavorites.forEach(p => {
        if (p._id === product._id) {
          getAllFavorites.pop(p);
          setGetAllFavorites([]);
        }
      })
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const showFavorites = async (product) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/get/${product._id}`
      );
      setGetAllFavorites((prev) => [...prev, response.data.product]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      // setGetAllFavorites([]);
      products.forEach((product) => {
        showFavorites(product);
      });
    }

    AOS.init();
  }, [products]);

  return (
    <div style={{minHeight:610}}>
      <Container>
        <div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">מוצרים מועדפים</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>

        <div className="dishes" style={{marginTop:50}} >
          <div className="box-container">
            {/* {products?.map((product, index) => { */}
            {getAllFavorites?.map((product, index) => {
              console.log(product._id);
              return (
                <div data-aos="zoom-in">
                  <div className="box" style={{marginBottom:50}}>
                    <IconButton className="eye"
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpen(true);
                      }}>
                      <Visibility />
                    </IconButton>

                    <IconButton
                      className="heart"
                      onClick={() => {
                        handleFavoriteToggle(product);

                      }}
                    >
                      <FavoriteIcon
                        color={isFavorite(product._id) ? "error" : "disabled"}
                      />
                    </IconButton>
                    <img src={product.image} alt={product.name} />
                    <h5>{product.name}</h5>
                    <span> {product.price} ₪</span>
                    <button className="btn"
                      onClick={() => {
                        addShoppingCart(product);
                      }}>
                      הוספה לסל</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedProduct && (
          <Dialog
            className="product-dialog"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              width: '100%', // רוחב מלא
              height: '100%', // גובה מלא
              display: 'flex',
              justifyContent: 'center', // מרכז אופקי
              alignItems: 'center', // מרכז אנכי
            }}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"
                sx={{
                  width: 550,
                  height: 480,
                }}
              >
                <h1> {selectedProduct.name}</h1>
                <p className="description"> {selectedProduct.description}</p>
                <img src={selectedProduct.image} alt="" />
                <button className="btn" onClick={addToCart} autoFocus sx={{ display: 'flex', }}>
                  הוספה לסל
                </button>
                <h2 className="price"> {selectedProduct.price} ₪</h2>
                {(selectedProduct.filter === "1" || selectedProduct.filter === "12" || selectedProduct.filter === "123" || selectedProduct.filter === "13") && <i className="fas fa-crown">&nbsp; מנה פופולארית </i>}
                {(selectedProduct.filter === "2" || selectedProduct.filter === "12" || selectedProduct.filter === "123" || selectedProduct.filter === "23") && <i className="fas fa-pepper-hot">&nbsp; מנה חריפה </i>}
                {(selectedProduct.filter === "3" || selectedProduct.filter === "13" || selectedProduct.filter === "123" || selectedProduct.filter === "23") && <i className="fas fa-leaf">&nbsp; מנה טבעונית </i>}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </Container >
    </div >
  );
};

export default Favorites;