import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";
import { login } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import t1 from "../../IMAGES/t1.png";
import t2 from "../../IMAGES/t2.png";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userDe, setUserDe] = useState({});
    const [date, setDate] = useState("");
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger;
        const dataObj = new Date(date);
        const year = dataObj.getFullYear();
        const month = dataObj.getMonth() + 1;
        const day = dataObj.getDate();
        const newDate = `${year}-${month}-${day}`;
        const userData = {
            email: email,
            date: newDate,
            newPassword: password,
        };
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/forgot_password",
                userData
            );

            if (response.status === 200) {
                alert("הסיסמא שונתה בהצלחה");
                navigation("/signIn");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <div className="forgot">
                {/* <Typography className="forgot" variant="h4" component="h2" align="center">
                    שכחתי סיסמא
                </Typography> */}
                <div className="title-design">
                    <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
                    <h1 data-aos="flip-down" data-aos-duration="1000">שכחתי סיסמא</h1>
                    <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="spacer">
                        <TextField
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
                            label="תאריך לידה"
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            margin="normal"
                        />
                    </div>
                    <div className="spacer">
                        <TextField
                            label="סיסמא חדשה"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            margin="normal"
                        />
                    </div>
                    <button
                        className="btn"
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                    >
                        סיסמא חדשה
                    </button>
                </form>
            </div>
        </Container>
    );
};

export default ForgotPassword;