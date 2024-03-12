import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

import { TextField,  Box, FormControl, InputLabel, MenuItem, Select,  FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";
import Alert from "@mui/material/Alert";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

import "./Pay.css";

const Pay = () => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");

  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
  const dateFormat = 'dd/MM/yyyy';
  const formattedDate = format(currentDate, dateFormat);

  const [comments, setComments] = useState("");

  // עדכון של התאריך בכל שינוי בתוך הקומפוננטה
  useEffect(() => {
    // const interval = setInterval(() => {
    setCurrentDate(new Date());
  }, 1000); // עדכון כל שנייה

  console.log(currentDate);
  console.log(formattedDate);

  const [branch, setBranch] = useState("");
  const handleChangeBranch = (event) => {
    setBranch(event.target.value);
  };

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
    } else if (typePay === "אשראי" && (cardCvv.length != 3)) {
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
        fullName: fullName,

        typeCollect: typeCollect,
        street: street,
        city: city,

        branch: branch,

        typePay: typePay,
        cardNumber: cardNumber,
        cardHolder: cardHolder,
        cardMonth: cardMonth,
        cardYear: cardYear,
        cardCvv: cardCvv,
        cardType: cardType,

        totalPrice: cart.totalAmount,
        date: formattedDate,

        products: [...cart.items],

        comments: comments,
      };
      debugger;
      try {
        const response = await axios.post(
          `http://localhost:3000/cart/user/${id}/new_order`,
          userData
        );
        const user = response.data;
        if (user) {

          if (response.status === 200) {
            setSuccess("הזמנתך התקבלה בהצלחה");
            dispatch(clearCart());

            setTimeout(() => {
              navigation("/");
            }, 2000);
          }
          else
            setError("התחבר לחשבון כדי להשלים את תהליך ההזמנה");
        }

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
    <div style={{ minHeight: 850}}>

      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">תשלום</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>

      <div className="pay" style={{marginTop:"10px"}}>

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

          <FormControl required style={{ marginRight: -200 }}>
            <InputLabel id="filter-label">בחירת סניף</InputLabel>
            <Select
              labelId="branch-label"
              id="branch"
              label="בחירת סניף"
              fullWidth
              required
              value={branch}
              // defaultValue={"0"}
              onChange={handleChangeBranch}
              color="error"
              sx={{ width: 210, }}
            >
              <MenuItem value={"אשדוד"}>אשדוד</MenuItem>
              <MenuItem value={"באר שבע"}>באר שבע</MenuItem>
              <MenuItem value={"רמת גן"}>רמת גן</MenuItem>
              <MenuItem value={"תל אביב"}>תל אביב</MenuItem>
              <MenuItem value={"לוד"}>לוד</MenuItem>
              <MenuItem value={"ראש העין"}>ראש העין</MenuItem>
              <MenuItem value={"כפר סבא"}>כפר סבא</MenuItem>
              <MenuItem value={"נתניה"}>נתניה</MenuItem>
              <MenuItem value={"עפולה"}>עפולה</MenuItem>
              <MenuItem value={"קרית אתא"}>קרית אתא</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ marginRight: -200 }}>
            <FormLabel id="demo-controlled-radio-buttons-group" sx={{ marginRight: 4, color: "white" }}>סוג איסוף</FormLabel>
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

          {typeCollect === "משלוח" && (<div style={{ marginRight: 35 }}>
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
              sx={{ marginRight: 5, }}

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
            <div style={{ marginRight: 35 }}>
              <div sx={{ marginBottom: 3 }}>
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
                  label="סוג כרטיס"
                  variant="outlined"
                  onChange={(e) => setCardType(e.target.value)}
                  color="error"

                  error={vaildationError.cardType}
                  helperText={vaildationError.cardType}
                  sx={{ marginRight: 3 }}
                />
              </div>
              <br />
              <div >
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
                  label="מספר כרטיס"
                  variant="outlined"
                  onChange={(e) => setCardNumber(e.target.value)}
                  color="error"

                  error={vaildationError.cardNumber}
                  helperText={vaildationError.cardNumber}
                  sx={{ marginRight: 3 }}
                />
              </div>
              <br />
              <div >
                <TextField
                  id="outlined-basic"
                  label="תוקף הכרטיס - חודש"
                  variant="outlined"
                  onChange={(e) => setCardMonth(e.target.value)}
                  color="error"

                  error={vaildationError.cardMonth}
                  helperText={vaildationError.cardMonth}

                />
                <TextField
                  id="outlined-basic"
                  label="תוקף הכרטיס - שנה"
                  variant="outlined"
                  onChange={(e) => setCardYear(e.target.value)}
                  color="error"

                  error={vaildationError.cardYear}
                  helperText={vaildationError.cardYear}
                  sx={{ marginRight: 3 }}

                />
              </div>

            </div>
          )}

          <TextField
            id="outlined-multiline-static"
            label="הערות על ההזמנה"
            multiline
            // fullWidth
            rows={4}
            value={comments}
            // required
            onChange={(e) => setComments(e.target.value)}
            sx={{ marginTop: 2, marginBottom: 2, marginRight: -3, height: 100, width: 400 }}
            color="error"
          />


          <div style={{ textAlign: "center", marginTop: 50 }}>
            <h3 style={{ color: "white", marginRight: "-170px" }}>סה"כ לתשלום : &nbsp;
              <span style={{ color: "#C1121F", fontWeight: "bold" }}>{cart.totalAmount}</span>       ₪</h3>

            <Link to="/Pay" className="btn btn-shadow" onClick={handleSubmit}
              style={{ marginTop: -70, marginRight: 400 }}
            >
              תשלום
            </Link>
          </div>
        </Box>
      </div>

      {success &&
        (<Alert severity="success" style={{ margin: "0 auto", width: 500, justifyContent: "center" }}
        >
          {success}
        </Alert>)
      }
      {error && (
        <Alert severity="error" style={{ margin: "0 auto", width: 500, justifyContent: "center" }}
        >
          {error}
        </Alert>
      )}
    </div>
  );
};

export default Pay;