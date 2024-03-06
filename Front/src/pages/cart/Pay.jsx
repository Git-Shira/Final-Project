import React, { useEffect, useState } from "react";
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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [vaildationError, setVaildationError] = useState({});

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

  const Validate = () => {
    const error = {};
    if (!fullName) {
      error.fullName = "שדה חובה";
    } else if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(fullName)) {
      error.fullName = "אנא הכנס שם מלא תקני, ללא רווחים רקים בתחילה או בסוף";
    }
    if (typeCollect === "takeAway" && !city) {
      error.city = "שדה חובה";
    } else if (typeCollect === "takeAway" && !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(city)) {
      error.city = "שם העיר לא תקין";
    }
    if (typeCollect === "takeAway" && !street) {
      error.street = "שדה חובה";
    } else if (typeCollect === "takeAway" && !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(street)) {
      error.street = "שם העיר לא תקין";
    }
    if (typePay === "card" && !cardNumber) {
      error.cardNumber = "שדה חובה";
    }
    if (typePay === "card" && !cardHolder) {
      error.cardNumber = "שדה חובה";
    } else if (typePay === "card" && !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(cardHolder)) {
      error.cardHolder = "אנא הכנס שם מלא תקני, ללא רווחים רקים בתחילה או בסוף";
    }
    if (typePay === "card" && !cardMonth) {
      error.cardMonth = "שדה חובה";
    } if (typePay === "card" && !cardYear) {
      error.cardYear = "שדה חובה";
    } if (typePay === "card" && !cardCvv) {
      error.cardCvv = "שדה חובה";
    } if (typePay === "card" && !cardType) {
      error.cardType = "שדה חובה";
    }

    setVaildationError(error);
    return Object.keys(error).length === 0;
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("cart", id);
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
            //  alert("הזמנתך התקבלה בהצלחה");
            dispatch(clearCart());
            navigation("/");
          }
        }

      } catch (err) {
        if (error.response.status === 500) {
          setError("משהו השתבש, נסו שוב")
        }
        console.error(err);
      }
    }
  };

  return (
    <Container maxWidth="sm">
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
        <Typography variant="h4">תשלום</Typography>

        <TextField
          id="outlined-basic"
          label="שם מלא"
          variant="outlined"
          onChange={(e) => setFullName(e.target.value)}
          color="error"
          required
          error={vaildationError.fullName}
          helperText={vaildationError.fullName}
        />

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">סוג קניה</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={typeCollect}
            onChange={handleChangeCollect}
          >
            <FormControlLabel value="selfCollection" control={<Radio />} label="איסוף עצמי" />
            <FormControlLabel value="takeAway" control={<Radio />} label="משלוח" />
          </RadioGroup>
        </FormControl>

        {typeCollect === "takeAway" && (<div>
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
          <TextField
            id="outlined-basic"
            label="עיר"
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
            color="error"

            error={vaildationError.city}
            helperText={vaildationError.city}
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
            <FormControlLabel value="cash" control={<Radio />} label="מזומן" />
            <FormControlLabel value="card" control={<Radio />} label="אשראי" />
          </RadioGroup>
        </FormControl>


        {typePay === "card" && (
          <div>
            {/* <Typography variant="h4">פרטי תשלום</Typography> */}
            <TextField
              id="outlined-basic"
              label="מספר כרטיס"
              variant="outlined"
              onChange={(e) => setCardNumber(e.target.value)}
              color="error"

              error={vaildationError.cardNumber}
              helperText={vaildationError.cardNumber}
            />
            <TextField
              id="outlined-basic"
              label="שם בעל הכרטיס"
              variant="outlined"
              onChange={(e) => setCardHolder(e.target.value)}
              color="error"

              error={vaildationError.cardHolder}
              helperText={vaildationError.cardHolder}
            />
            <TextField
              id="outlined-basic"
              label="חודש"
              variant="outlined"
              onChange={(e) => setCardMonth(e.target.value)}
              color="error"

              error={vaildationError.cardMonth}
              helperText={vaildationError.cardMonth}
            />
            <TextField
              id="outlined-basic"
              label="שנה"
              variant="outlined"
              onChange={(e) => setCardYear(e.target.value)}
              color="error"

              error={vaildationError.cardYear}
              helperText={vaildationError.cardYear}
            />
            <TextField
              id="outlined-basic"
              label="CVV"
              variant="outlined"
              onChange={(e) => setCardCvv(e.target.value)}
              color="error"

              error={vaildationError.cardCvv}
              helperText={vaildationError.cardCvv}
            />
            <TextField
              id="outlined-basic"
              label="סוג כרטיס"
              variant="outlined"
              onChange={(e) => setCardType(e.target.value)}
              color="error"

              error={vaildationError.cardType}
              helperText={vaildationError.cardType}
            />
          </div>
        )}

        <h1>סהכ לתשלום {cart.totalAmount}</h1>

        <Button variant="contained" onClick={handleSubmit} to="/Pay">
          תשלום
        </Button>
      </Box>
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
    </Container>
  );
};

export default Pay;
