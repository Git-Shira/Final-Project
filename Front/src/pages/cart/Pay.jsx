import React, { useEffect, useState } from "react";
// import "./Pay.css";

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Container,
  FormControlLabel, FormLabel, RadioGroup, Radio

} from "@mui/material";
import { clearCart } from "../../redux/cartSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { useSelector, useDispatch } from "react-redux";

import { format } from 'date-fns';


const Pay = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [id, setId] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [fullName, setFullName] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
  const dateFormat = 'dd/MM/yyyy';
  const formattedDate = format(currentDate, dateFormat);

  // עדכון של התאריך בכל שינוי בתוך הקומפוננטה
  useEffect(() => {
    // const interval = setInterval(() => {
    setCurrentDate(new Date());
  }, 1000); // עדכון כל שנייה

  console.log(currentDate);
  console.log(formattedDate);

  const [typeCollect, setTypeCollect] = React.useState("");
  const handleChangeCollect = (event) => {
    setTypeCollect(event.target.value);
  };

  const [typePay, setTypePay] = React.useState("");
  const handleChangePay = (event) => {
    setTypePay(event.target.value);
  };

  const navigation = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setId(user?._id);
  }, []);

  console.log("id", id);
  const handlePatment = () => {
    console.log("cardNumber", cardNumber);
    console.log("cardHolder", cardHolder);
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("cart", id);
  const handleSubmit = async (e) => {
    const userData = {
      userId: id,
      typePay: typePay,
      cardNumber: cardNumber,
      cardHolder: cardHolder,
      cardMonth: cardMonth,
      cardYear: cardYear,
      cardCvv: cardCvv,
      cardType: cardType,
      typeCollect: typeCollect,
      street: street,
      city: city,
      fullName: fullName,
      totalPrice: cart.totalAmount,
      products: [...cart.items],
      date: formattedDate,
    };
    debugger;
    try {
      const response = await axios.post(
        `http://localhost:3000/cart/user/${id}/new_order`,
        userData
      );
      const user = response.data;
      if (user) {
        alert("הזמנתך התקבלה בהצלחה");
        dispatch(clearCart());
        navigation("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" >
      <div className="pay" style={{ minHeight: 750 }}>
        <Box
          component="form"
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            width: "50%",
            margin: "auto",
          }}
        >

          <div className="title-design">
            <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
            <h1 data-aos="flip-down" data-aos-duration="1000">תשלום</h1>
            <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
          </div>
          <TextField
            id="outlined-basic"
            label="שם מלא"
            variant="outlined"
            onChange={(e) => setFullName(e.target.value)}
            color="error"
            required
          // error={vaildationError.fullName}
          // helperText={vaildationError.fullName}
          />

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">סוג קניה</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={typeCollect}
              onChange={handleChangeCollect}
            >
              <FormControlLabel value="איסוף עצמי" control={<Radio />} label="איסוף עצמי" />
              <FormControlLabel value="משלוח" control={<Radio />} label="משלוח" />
            </RadioGroup>
          </FormControl>

          {typeCollect === "משלוח" && (<div>
            {/* <Typography variant="h4">פרטי משלוח</Typography> */}

            <TextField
              id="outlined-basic"
              label="כתובת מלאה"
              variant="outlined"
              onChange={(e) => setStreet(e.target.value)}
              color="error"

            // error={vaildationError.street}
            // helperText={vaildationError.street}
            />
            <TextField
              id="outlined-basic"
              label="עיר"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              color="error"

            // error={vaildationError.city}
            // helperText={vaildationError.city}
            />
          </div>
          )}

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">סוג תשלום</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={typePay}
              onChange={handleChangePay}
            >
              <FormControlLabel value="מזומן" control={<Radio />} label="מזומן" />
              <FormControlLabel value="אשראי" control={<Radio />} label="אשראי" />
            </RadioGroup>
          </FormControl>


          {typePay === "אשראי" && (
            <div>
              {/* <Typography variant="h4">פרטי תשלום</Typography> */}
              <TextField
                id="outlined-basic"
                label="מספר כרטיס"
                variant="outlined"
                onChange={(e) => setCardNumber(e.target.value)}
                color="error"

              // error={vaildationError.cardNumber}
              // helperText={vaildationError.cardNumber}
              />
              <TextField
                id="outlined-basic"
                label="שם בעל הכרטיס"
                variant="outlined"
                onChange={(e) => setCardHolder(e.target.value)}
                color="error"

              // error={vaildationError.cardHolder}
              // helperText={vaildationError.cardHolder}
              />
              <TextField
                id="outlined-basic"
                label="חודש"
                variant="outlined"
                onChange={(e) => setCardMonth(e.target.value)}
                color="error"

              // error={vaildationError.cardMonth}
              // helperText={vaildationError.cardMonth}
              />
              <TextField
                id="outlined-basic"
                label="שנה"
                variant="outlined"
                onChange={(e) => setCardYear(e.target.value)}
                color="error"

              // error={vaildationError.cardYear}
              // helperText={vaildationError.cardYear}
              />
              <TextField
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                onChange={(e) => setCardCvv(e.target.value)}
                color="error"

              // error={vaildationError.cardCvv}
              // helperText={vaildationError.cardCvv}
              />
              <TextField
                id="outlined-basic"
                label="סוג כרטיס"
                variant="outlined"
                onChange={(e) => setCardType(e.target.value)}
                color="error"

              // error={vaildationError.cardType}
              // helperText={vaildationError.cardType}
              />
            </div>
          )}

          <h1>סהכ לתשלום {cart.totalAmount}</h1>

          {/* <button 
             variant="contained" onClick={handleSubmit} >*/}
            <Link to="/Pay" className="btn" onClick={handleSubmit}>
              תשלום
            </Link>
          {/* </button> */}
        </Box>

        {/* {success && (<Alert severity="success"
        >
          {success}
        </Alert>)
        }
        {error && (
          <Alert severity="error"
          >
            {error}
          </Alert>
        )} */}
      </div>
    </Container>
  );
};

export default Pay;
