import React, { useEffect, useState } from "react";
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

import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./Products.css";
import { Visibility } from "@mui/icons-material";

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [selectCategory, setSelectCategory] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([0, 449]);
  const [open, setOpen] = React.useState(false);
  const [favoriteStatus, setFavoriteStatus] = React.useState({});

  const userCookies = Cookies.get("user");
  const user = userCookies ? JSON.parse(userCookies) : null;

  const [selectedButton, setSelectedButton] = React.useState("");
  const [search, setSearch] = React.useState("");

  const categorys = ["ראשונות", "מרקים", "סושי ספיישל", "ניגירי", "סשימי", "קומבינציות", "מגשי מסיבה", "באנים", "מוקפצים", "עיקריות", "סלטים", "תפריט טבעוני", "קינוחים", "משקאות"];

  const [closeIt, setCloseIt] = React.useState(false);
  const handleOpenIt = () => {
    setCloseIt(true);
  }
  const handleCloseIt = () => {
    setCloseIt(false);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites); // Updated selector

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
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
    setSelectedButton("");
    setSelectCategory("");
    setPriceRange([0, 449]);
    setSearch("");
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (category) => {
    if (selectedButton.includes(category)) {
      setSelectedButton("");
      setSelectCategory("");
    } else {
      setSelectedButton(category);
      setSelectCategory(category);
    }
  };

  const isButtonSelected = (category) => {
    return selectedButton.includes(category);
  };

  const handleChangePrice = (event, newValue) => {
    setPriceRange(newValue);
  };
  const isFavorite = (productId) => {
    return favorites.some((favorite) => favorite._id === productId);
  };
  const handleFavoriteToggle = (product) => {
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite._id === product._id
    );
    if (isAlreadyFavorite) {
      dispatch(removeFromFavorites(product._id));
    } else {
      dispatch(addToFavorites(product));
    }
  };
  console.log(isFavorite);

  const messages = [
    '.במידה ויש שינוי שאותו אתם רוצים לבצע בהזמנה יש להתקשר לסניף ולבצע שינוי זה. ',
    'בעקבות מזג האוויר ייתכנו זמני המתנה ארוכים מהרגיל, אנו פועלים על מנת לספק את ההזמנות מהר ככל האפשר',
    `לחצו על ה- &nbsp;&nbsp;&nbsp; כדי להוסיף למוצרים האהובים`,
    `לחצו על ה- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; כדי לראות פרטים נוספים על המנה`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMessage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextMessage, 10000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(intervalId);
  }, []); // Run once on mount to start the automatic rotation

  return (
    <div>
      <Container>

        <div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">התפריט שלנו</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>

        <div className="message-container">
          <h5>שימו לב ! </h5>
          <br />
          <h5 key={currentIndex} dangerouslySetInnerHTML={{ __html: messages[currentIndex] }} ></h5>

          {currentIndex === 2 &&
            <FavoriteIcon className="message-heart" />
          }
          {currentIndex === 3 && <Visibility className="message-eye" />}

        </div>
        <div className="buttons-container">
          <button onClick={prevMessage} className="btn-prev"><i class="fa fa-caret-right" aria-hidden="true"></i>
          </button>
          <button onClick={nextMessage} className="btn-next"><i class="fa fa-caret-left" aria-hidden="true"></i>
          </button>
        </div>

        <div className="categories">
          {categorys.map((category, index) => {
            return (
              <button
                className="button-category"
                key={index}
                onClick={() => {
                  handleChange(category);
                }}
                style={{
                  backgroundColor: isButtonSelected(category) ? "black" : "white", // Change to black when selected
                  color: isButtonSelected(category) ? "white" : "black",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 50 }}>
          <strong style={{ marginLeft: 5 }}> סינון לפי מחיר: &nbsp;  </strong>

          {priceRange[1]} ₪

          <Box
            sx={{
              width: 300
              , marginRight: 2, marginLeft: 2
            }}
          >
            <Slider
              className="price-range"
              value={priceRange}
              onChange={handleChangePrice}
              aria-label="Price range"
              defaultValue={20}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={449}
              sx={{ color: "black", height: 10, }} />
          </Box>
          {priceRange[0]} ₪

          <strong
            style={{
              marginRight: 50,
              marginLeft: 5
            }}
          >חיפוש מנה: &nbsp;</strong>
          <TextField
            id="outlined-basic"
            className="search"
            label="Search"
            type={"text"}
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            defaultValue={search}
            autoComplete="off"
          />
          <div className="reset">
            {(selectCategory || search || priceRange[0] != 0 || priceRange[1] != 449) &&
              <button className="btn"
                onClick={() => {
                  resetFilter();
                }}
                style={{ marginRight: 140 }}>נקה סינון</button>
            }
          </div>
        </div>

        <div className="dishes">
          <div className="box-container">


            {products
              .filter(
                (product) =>
                  (selectCategory === ""
                    ? true
                    : product.category === selectCategory)
                  &&
                  product.price >= priceRange[0] &&
                  product.price <= priceRange[1] &&
                  product.name.toLowerCase().startsWith(search.toLowerCase())
              )
              .map((product, index) => {
                console.log(product._id);
                return (
                  <div data-aos="zoom-in">
                    <div className="box">
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
                          if (!user) {
                            handleOpenIt();
                          }
                          else
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

        <Dialog
          className="not-connected-dialog"
          open={closeIt}
          onClose={handleCloseIt}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            width: '100%', // רוחב מלא
            height: '100%', // גובה מלא
            display: 'flex',
            justifyContent: 'center', // מרכז אופקי
            alignItems: 'center', // מרכז אנכי
          }}>
          <DialogContent
            sx={{ height: 200, width: 400, paddingTop: 7, paddingLeft: 3, paddingRight: 3 }}>
            כדי לסמן מוצרים אהובים עליכם להתחבר לחשבון
            <br />
            <button className="btn" sx={{ marginBottom: 15 }}>
              <Link to={"/SignIn"} className="button-link"> לחצו להתחברות</Link>
            </button>
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
      </Container>
    </div >
  );
};

export default Products;
