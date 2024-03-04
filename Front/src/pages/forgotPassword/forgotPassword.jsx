import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

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
                navigation("/signin");
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4" component="h2" align="center">
                    שחכתי סיסמא
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        margin="normal"
                    />
                    <TextField
                        label="new Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                    >
                        סיסמא חדשה
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default ForgotPassword;