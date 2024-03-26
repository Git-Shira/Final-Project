import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Container } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText, Select } from "@mui/material";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Visibility } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { addToFavorites, removeFromFavorites, } from "../../redux/favoritesSlice";

import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./Favorites.css";

const Favorites = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [open, setOpen] = React.useState(false);
  const cartFromCookies = Cookies.get("favorites");

  const [getAllFavorites, setGetAllFavorites] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites); // Updated selector

  const addShoppingCart = (products) => {
    dispatch(
      addItem({
        id: products._id,
        name: products.name,
        price: products.price,
        image: products.image,
        quantity: 1,
        filter: products.filter,
        show: 1
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
          show: 1
        })
      );
    }
  };

  const getProducts = () => {
    // debugger;
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
      products.forEach((product) => {
        showFavorites(product);
      });
    }

    AOS.init();
  }, [products]);

  return (
    <div style={{ minHeight: 610 }}>
      <Container>
        <div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">מוצרים מועדפים</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>

        <div className="dishes" style={{ marginTop: "50px" }}>
          <div className="box-container">
            {/* {products?.map((product, index) => { */}
            {getAllFavorites ?
              getAllFavorites?.map((product, index) => {
                console.log(product._id);
                return (
                  <div data-aos="zoom-in">
                    <div className="box"
                      style={{
                        background: (product.show === 1) ? "white" : "#bfc0c0",
                        borderColor: (product.show === 1) ? "#C1121F" : "black"
                      }}>
                      <IconButton className="eye"
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpen(true);
                        }}
                        style={{
                          borderColor: (product.show === 1) ? "#C1121F" : "white"
                        }}>
                        <Visibility />
                      </IconButton>


                      <IconButton
                        className="heart"
                        onClick={() => {
                          handleFavoriteToggle(product);
                        }}
                        style={{
                          borderColor: (product.show === 1) ? "#C1121F" : "white"
                        }}
                      >
                        <FavoriteIcon
                          color={isFavorite(product._id) ? "black" : "disabled"}
                        />
                      </IconButton>

                      <img src={product.image} alt={product.name} />
                      <div style={{ height: 20, alignItems: "center", margin: 0 }}>
                        <h5> {product.name}</h5>
                      </div>
                      <br />
                      {product.show === 1 && (
                        <div>
                          <span className="product-price"> {product.price} ₪</span>
                          <button className="btn"
                            onClick={() => {
                              addShoppingCart(product);
                            }}>
                            הוספה לסל</button>
                        </div>
                      )}
                      {product.show === 0 && (<h3 className="no-available" >-אזל מהמלאי-</h3>)}
                    </div>
                  </div>
                );
              })
              :
              <div style={{textAlign:"center",justifyContent:"center",width:"1140px",marginTop:100,fontSize:"x-large"}}>סמנו את המוצרים האהובים עליכם וצפו בהם כאן :)</div>
              }
          </div>
        </div>
        <div style={{ height: 30 }}></div>
        {selectedProduct && (
          <Dialog
            className="product-dialog"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"
                sx={{
                  width: 550,
                  height: 480,
                }}
              >
                <h2> {selectedProduct.name}</h2>
                <p className="description"> {selectedProduct.description}</p>
                <img src={selectedProduct.image} alt="" />

                {selectedProduct.show === 1 && (
                  <button className="btn" onClick={addToCart} autoFocus sx={{ display: 'flex', }}>
                    הוספה לסל
                  </button>
                )}

                {selectedProduct.show === 0 && (<h3 className="no-available" style={{ marginTop: "-45px", marginRight: "360px" }}>-אזל מהמלאי-</h3>)}

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