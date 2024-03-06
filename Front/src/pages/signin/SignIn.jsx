import React, { useEffect , useState } from "react";
import { Container, Typography, TextField, Button, IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import { login } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AOS from 'aos';

import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDe, setUserDe] = useState({});

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // to add here
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      const user = response.data.user;
      dispatch(login(user));
      localStorage.setItem("user", JSON.stringify(user));
      if (user.permission === "admin") {
        navigation("/Admin/Management");
        alert("התחברת בהצלחה");
      } else {
        navigation("/");
        alert("התחברת בהצלחה");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Container maxWidth="sm">
      <div className="hithabrut" >
        {/* <Typography className="hithabrut" variant="h4" component="h2" align="center">
          התחברות
        </Typography> */}

        <div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">התחברות</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="spacer">
            <TextField
              className="rGap"
              label="מייל"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />
          </div>
          <div className="spacer">
            <TextField
              className="right"
              id="password"
              label="סיסמא"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button
            className="btn"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ marginTop: "10px" }}
          >
            כניסה
          </button>
        </form>

        <Typography
          className="typo"
          variant="body1"
          align="center">
          עדיין לא רשומים? <Link to={"/SignUp"}>הרשמה </Link>
        </Typography>
        <Typography
          variant="body1" align="center">
          <Link to={"/ForgotPassword"}>שכחתי סיסמא </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default SignIn;