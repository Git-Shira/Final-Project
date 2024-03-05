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
  const [priceRange, setPriceRange] = React.useState([0, 150]);
  const [open, setOpen] = React.useState(false);
  const [favoriteStatus, setFavoriteStatus] = React.useState({});

  const userCookies = Cookies.get("user");
  const user = userCookies ? JSON.parse(userCookies) : null;

  // const [selectedButton, setSelectedButton] = React.useState([]);
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
    debugger;
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
    debugger;
    if (selectedProduct) {
      dispatch(
        addItem({
          id: selectedProduct._id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
          quantity: 1,
          filter: selectedProduct.filter,
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
    // setSelectedButton([]);
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
      // setSelectedButton(selectedButton.filter((item) => item !== category));
      setSelectedButton("");
      setSelectCategory("");
    } else {
      // setSelectedButton([...selectedButton, category]);
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
    debugger;
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
                <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000"/>
                <h1 data-aos="flip-down" data-aos-duration="1000">התפריט שלנו</h1>
            <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000"/>
            </div>

            <div className="message-container">
                 <h5>שימו לב ! </h5>
                 <br />
                <h5 key={currentIndex} dangerouslySetInnerHTML={{ __html: messages[currentIndex] }} ></h5>
            
            {currentIndex===2 &&
             <FavoriteIcon className="message-heart"/>
              }
            {currentIndex===3 && <Visibility className="message-eye"/>}

            </div>
            <div className="buttons-container">
                <button onClick={prevMessage} className="btn-prev"><i class="fa fa-caret-right" aria-hidden="true"></i>
                </button>
                <button onClick={nextMessage} className="btn-next"><i class="fa fa-caret-left" aria-hidden="true"></i>
                </button>
            </div>

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
            max={449}
          />
        </Box>

        <TextField
          id="outlined-basic"
          label="Search"
          type={"text"}
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />

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
         
        {(selectCategory || search || priceRange[0] != 0 || priceRange[1] != 449) &&
          <Button
            onClick={() => {
              resetFilter();
            }}
          >
            Reset
          </Button>
        }

        {products
          .filter(
            (product) =>
              (selectCategory === ""
                ? true
                : product.category === selectCategory) &&
                product.price >= priceRange[0] &&
              product.price <= priceRange[1] &&
              product.name.toLowerCase().startsWith(search.toLowerCase())
          )
          .map((product, index) => {
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
                  ₪ {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Amount: {product.amount}
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    Description: {product.description}
                  </Typography> */}
                </CardContent>
                <CardActions>
                  <IconButton
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
                <img src={selectedProduct.image} alt="" width={200} />
                <h1> {selectedProduct.name}</h1>
                <h2>₪ {selectedProduct.price}</h2>
                {/* <h3> {selectedProduct.amount}</h3> */}
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

