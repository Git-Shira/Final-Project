import React, { useState } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Pay = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");

  const handlePatment = () => {
    console.log("cardNumber", cardNumber);
    console.log("cardHolder", cardHolder);
  };
  const cart = useSelector((state) => state.cart);
  console.log("cart", cart);
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
        <Typography variant="h4">פרטי משלוח</Typography>
        <TextField
          id="outlined-basic"
          label="שם מלא"
          variant="outlined"
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="כתובת מלאה"
          variant="outlined"
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="עיר"
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
        />
      </Box>

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
        <h1>סהכ לתשלום {cart.totalAmount}</h1>
        <Typography variant="h4">פרטי תשלום</Typography>
        <TextField
          id="outlined-basic"
          label="מספר כרטיס"
          variant="outlined"
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="שם בעל הכרטיס"
          variant="outlined"
          onChange={(e) => setCardHolder(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="חודש"
          variant="outlined"
          onChange={(e) => setCardMonth(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="שנה"
          variant="outlined"
          onChange={(e) => setCardYear(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="CVV"
          variant="outlined"
          onChange={(e) => setCardCvv(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="סוג כרטיס"
          variant="outlined"
          onChange={(e) => setCardType(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handlePatment}
          to="/Pay"
          component={Link}
        >
          תשלום{" "}
        </Button>
      </Box>
    </Container>
  );
};

export default Pay;
