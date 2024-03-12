import React, { useState, useEffect } from "react";
import axios from "axios";

import { Table, TableHead, TableBody, TableRow, TableCell, Button}  from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";

import AOS from 'aos';

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
    <div style={{ minHeight: 610 }}>
      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">ארכיון הזמנות</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>

      {loading ? (
        <p
          style={{ marginTop: "10px" }}
        >Loading...</p>
      ) : error ? (
        <p
          style={{ marginTop: "10px" }}
        >Error: {error.message}</p>
      ) : (
        <Table className="table table-bordered" style={{
          maxWidth: 1000, marginTop: "10px"
        }}>
          <TableHead>
            <TableRow style={{ borderColor: "#C1121F" }} className="table-row">
              <TableCell align="center" > תאריך</TableCell>
              <TableCell align="center" >מספר הזמנה</TableCell>{" "}
              <TableCell align="center" >סניף</TableCell>{" "}
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
                  {user.branch}</TableCell>
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
          width: '100%', 
          height: '100%',
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"
            sx={{
              width: 550,
              height: 480,
            }}
          >
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