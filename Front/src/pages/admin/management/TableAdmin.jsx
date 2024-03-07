import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  Box,
  Container,
} from "@mui/material";
import axios from "axios";
import AOS from 'aos';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";

import t1 from "../../../IMAGES/t1.png";
import t2 from "../../../IMAGES/t2.png";

const TableAdmin = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to store the ID of the selected user
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cart/all`);
        setUserData(response.data.carts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    AOS.init();
  }, []);
  console.log(userData);
  return (
    <div>
      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">ארכיון הזמנות</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table className="table table-bordered" style={{
          maxWidth: 1000, marginTop: 50
        }}>
          <TableHead>
            <TableRow style={{ borderColor: "#C1121F" }} className="table-row">
              <TableCell align="center" > תאריך</TableCell>
              <TableCell align="center" >מספר הזמנה</TableCell>{" "}
              {/* Replace with relevant user data */}
              {/* Replace with relevant user data */}
              <TableCell align="center" >שם המזמין</TableCell>
              <TableCell align="center" >סוג איסוף</TableCell>
              <TableCell align="center" >אופן תשלום</TableCell>
              <TableCell align="center" >מחיר כולל</TableCell>
              <TableCell align="center" >פרטי הזמנה</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {userData?.map((user) => (
              <TableRow style={{ borderColor: "#C1121F", borderRadius: 2 }} key={user._id}>
                <TableCell align="center" >
                  {user.date}</TableCell>
                <TableCell align="center" >
                  {user._id}</TableCell>
                <TableCell align="center" >
                  {user.fullName}</TableCell>

                <TableCell align="center" >
                  {user.typePay}</TableCell>
                <TableCell align="center" >
                  {user.typeCollect}</TableCell>
                <TableCell align="center" >
                  {user.totalPrice} ₪</TableCell>
                <TableCell align="center" >
                  <Button onClick={() => handleOpenModal(user)}
                    sx={{ color: "#C1121F", "&:hover": { backgroundColor: "black", color: "white" } }}
                  > פרטי הזמנה
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="alert-dialog-title"
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
            {/* <Box 
            // component="form"
            // sx={{
            //   "& > :not(style)": { m: 1, width: "25ch" },
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "center",
            //   backgroundColor: "white",
            //   justifyContent: "center",
            //   gap: "1rem",
            //   width: "50%",
            //   margin: "auto",
            // }}
            // sx={{
            //   width: '100%', // רוחב מלא
            //   height: '100%', // גובה מלא
            //   display: 'flex',
            //   justifyContent: 'center', // מרכז אופקי
            //   alignItems: 'center', // מרכז אנכי
            // }}
            // >
          */}
            <h2 style={{ color: "#C1121F", fontWeight: "bold", marginBottom: 10 }}>פרטי הזמנה</h2>
            <Table className="table table-bordered">
              <TableHead>
                <TableRow style={{ borderColor: "#C1121F" }} className="table-row">
                  <TableCell align="center">שם מוצר</TableCell>
                  <TableCell align="center" style={{ width: 50 }}>כמות</TableCell>
                  <TableCell align="center" style={{ width: 70 }}>מחיר</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedUser?.products?.map((product, productIndex) => (
                  <TableRow style={{ borderColor: "#C1121F" }} className="table-row" key={productIndex}>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{product.quantity}</TableCell>
                    <TableCell align="center">{product.price} ₪</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableAdmin;
