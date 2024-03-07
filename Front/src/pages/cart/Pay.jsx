import React, { useEffect, useState } from "react";
import "./Pay.css";

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
import AOS from 'aos';

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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [vaildationError, setVaildationError] = useState({});

  const Validate = () => {
    const error = {};
    if (!fullName) {
      error.fullName = "שדה חובה";
    } else if (!/^[א-ת]+( [א-ת]+)*$/.test(fullName)) {
      error.fullName = "אנא הכנס שם מלא תקני, ללא רווחים ריקים בתחילה או בסוף";
    }
    if (!(typeCollect === "משלוח" || typeCollect === "איסוף עצמי")) {
      error.typeCollect = "שדה חובה";
    }
    if (typeCollect === "משלוח" && !city) {
      error.city = "שדה חובה";
    } else if (typeCollect === "משלוח" && !/^[א-ת]+( [א-ת]+)*$/.test(city)) {
      error.city = "אנא הכנס שם עיר תקני, ללא רווחים ריקים בתחילה או בסוף";
    }
    if (typeCollect === "משלוח" && !street) {
      error.street = "שדה חובה";
    } else if (typeCollect === "משלוח" && !/^[א-ת]+( [א-ת]+)*$/.test(street)) {
      error.street = "אנא הכנס שם עיר תקני, ללא רווחים ריקים בתחילה או בסוף";
    }
    if (typePay === "אשראי" && !cardNumber) {
      error.cardNumber = "שדה חובה";
    }
    if (typePay === "אשראי" && !cardHolder) {
      error.cardHolder = "שדה חובה";
    } else if (typePay === "אשראי" && !/^[א-ת]+( [א-ת]+)*$/.test(cardHolder)) {
      error.cardHolder = "אנא הכנס שם מלא תקני, ללא רווחים ריקים בתחילה או בסוף";
    }
    if (typePay === "אשראי" && !cardMonth) {
      error.cardMonth = "שדה חובה";
    } else if (typePay === "אשראי" && (cardMonth > 12 || cardMonth < 1)) {
      error.cardMonth = "מספר חודש לא תקין";
    }
    if (typePay === "אשראי" && !cardYear) {
      error.cardYear = "שדה חובה";
    } else if (typePay === "אשראי" && (cardYear < 2024)) {
      error.cardYear = " תוקף הכרטיס פג";
    }
    if (typePay === "אשראי" && !cardCvv) {
      error.cardCvv = "שדה חובה";
    } else if (typePay === "אשראי" && (cardCvv > 1000 || cardCvv < 100)) {
      error.cardCvv = "CVV לא תקין";
    }
    if (typePay === "אשראי" && !cardType) {
      error.cardType = "שדה חובה";
    }
    setVaildationError(error);
    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = async (e) => {
    if (Validate()) {
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
        if (response.status === 200) {
          if (user) {
            setSuccess("הזמנתך התקבלה בהצלחה");
            dispatch(clearCart());

            setTimeout(() => {
              navigation("/");
            }, 2000);
          }
        }
        // if (user) {
        // alert("הזמנתך התקבלה בהצלחה");
        // dispatch(clearCart());
        // navigation("/");
        // }
      } catch (err) {
        if (err.response.status === 400) {
          setError("התחברו לחשבון כדי לבצע את ההזמנה");
        }
        if (err.response.status === 500) {
          setError("משהו השתבש, נסו שוב")
        }
        console.error(err);
      }
    }
  };

  return (
    // <Container>
    <div className="pay" style={{ minHeight: 610, }}>
      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">תשלום</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>
      <div >
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


          <TextField
            id="outlined-basic"
            label="שם מלא"
            variant="outlined"
            onChange={(e) => setFullName(e.target.value)}
            color="error"
            required
            error={vaildationError.fullName}
            helperText={vaildationError.fullName}
            style={{ marginRight: -200 }}
          />

          <FormControl style={{ marginRight: -200 }}>
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ marginRight: 4, color: "white" }}>סוג קניה</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={typeCollect}
              onChange={handleChangeCollect}
            >
              <FormControlLabel value="איסוף עצמי" control={<Radio />} label="איסוף עצמי" />
              <br />
              <FormControlLabel value="משלוח" control={<Radio />} label="משלוח" style={{ marginTop: -65, marginRight: 200 }} />
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

              error={vaildationError.street}
              helperText={vaildationError.street}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="עיר"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              color="error"

              error={vaildationError.city}
              helperText={vaildationError.city}
              sx={{ marginRight: 30, marginTop: -7 }}

            />
          </div>
          )}

          <FormControl style={{ marginRight: -200 }}>
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ marginRight: 4, color: "white" }}>סוג תשלום</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={typePay}
              onChange={handleChangePay}

            >
              <FormControlLabel value="מזומן" control={<Radio />} label="מזומן" />
              <br />
              <FormControlLabel value="אשראי" control={<Radio />} label="אשראי" style={{ marginTop: -65, marginRight: 200 }} />
            </RadioGroup>
          </FormControl>


          {typePay === "אשראי" && (
            <div style={{ marginRight: 150 }}>
              {/* <Typography variant="h4">פרטי תשלום</Typography> */}
              <TextField
                id="outlined-basic"
                label="מספר כרטיס"
                variant="outlined"
                onChange={(e) => setCardNumber(e.target.value)}
                color="error"

                error={vaildationError.cardNumber}
                helperText={vaildationError.cardNumber}
                sx={{ marginBottom: 3 }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="שם בעל הכרטיס"
                variant="outlined"
                onChange={(e) => setCardHolder(e.target.value)}
                color="error"

                error={vaildationError.cardHolder}
                helperText={vaildationError.cardHolder}
                sx={{ marginBottom: 3 }}

              />
              <br />
              <TextField
                id="outlined-basic"
                label="חודש"
                variant="outlined"
                onChange={(e) => setCardMonth(e.target.value)}
                color="error"

                error={vaildationError.cardMonth}
                helperText={vaildationError.cardMonth}
              // sx={{marginBottom:3}}

              />
              <TextField
                id="outlined-basic"
                label="שנה"
                variant="outlined"
                onChange={(e) => setCardYear(e.target.value)}
                color="error"

                error={vaildationError.cardYear}
                helperText={vaildationError.cardYear}
                sx={{ marginRight: 30, marginTop: -27 }}

              />
              <TextField
                id="outlined-basic"
                label="CVV"
                type="number"
                variant="outlined"
                onChange={(e) => setCardCvv(e.target.value)}
                color="error"

                error={vaildationError.cardCvv}
                helperText={vaildationError.cardCvv}
                sx={{ marginRight: 30, marginTop: -20 }}
              />
              <TextField
                id="outlined-basic"
                label="סוג כרטיס"
                variant="outlined"
                onChange={(e) => setCardType(e.target.value)}
                color="error"

                error={vaildationError.cardType}
                helperText={vaildationError.cardType}
                sx={{ marginRight: 30, marginTop: -13 }}
              />
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 50 }}>
            <h3 style={{ color: "white", marginRight: -200 }}>סה"כ לתשלום : &nbsp;
              <span style={{ color: "#C1121F", fontWeight: "bold" }}>{cart.totalAmount}</span>       ₪</h3>

            <Link to="/Pay" className="btn btn-shadow" onClick={handleSubmit}
              style={{ marginTop: -70, marginRight: 400 }}
            >
              תשלום
            </Link>
          </div>
        </Box>
      </div>
      {success && (<Alert severity="success"
      >
        {success}
      </Alert>)
      }
      {error && (
        <Alert severity="error"
        >
          {error}
        </Alert>
      )}
    </div>
    // </Container>
  );
};

export default Pay;
