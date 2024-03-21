import React, { useState, useEffect } from "react";
import axios from "axios";

import {  Table,  TableHead,  TableBody,  TableRow,  TableCell,  Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material";

const TableOrder = ({ id }) => {
  console.log("id", id);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [idPerson, setIdPreson] = useState("");
  const [selectedUser, setSelectedUser] = useState([]); // State to store the ID of the selected user

  const handleOpenModal = (data) => {
    setOpenModal(true);
    setSelectedUser(data);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    setIdPreson(id._id);
  }, [id._id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!idPerson) return;

      console.log("id", idPerson);

      try {
        if (idPerson) {
          const response = await axios.get(
            `http://localhost:3000/cart/user/${idPerson}/getOrders`
          );
          setUserData(response.data.orders);
          setLoading(false);
        }

      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [idPerson]);
  console.log(userData);
  return (
    <div className="profile-user">

      {loading ? (
        <p style={{ color: "white" }}>טוען...</p>
      ) : error ? (
        <p style={{ color: "white" }}>Error: {error.message}</p>
      ) : (
        <Table className="table table-bordered"
          style={{
            maxWidth: 1000, marginTop: 30
          }}
        >
          <TableHead>
            <TableRow style={{ borderColor: "#C1121F" }} className="table-row">
              <TableCell align="center" >תאריך</TableCell>
              <TableCell align="center" >מספר הזמנה</TableCell>
              <TableCell align="center" >סניף</TableCell>
              <TableCell align="center" >מחיר כולל</TableCell>
              <TableCell align="center" >פרטי הזמנה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow style={{ borderColor: "#C1121F", borderRadius: 2 }}>
                <TableCell align="center" >
                  {user.date}</TableCell>
                <TableCell align="center" >
                  {user._id}</TableCell> {/* Display userId */}
                {/* Display fullAddress */}
                <TableCell align="center" >
                  {user.branch}</TableCell>
                <TableCell align="center" >
                  {user.totalPrice} ₪</TableCell>{" "}
                {/* Display totalPrice */}
                <TableCell align="center" >

                  <Button onClick={() => handleOpenModal(user)}
                    sx={{ color: "#C1121F", "&:hover": { backgroundColor: "black", color: "white" } }}
                  >
                    פרטי הזמנה
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
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
              justifyContent: "center",
              gap: "1rem",
              width: "50%",
              margin: "auto",
            }}
          > */}
            <h2 style={{ color: "#C1121F", fontWeight: "bold", marginBottom: 10 }}>פרטי הזמנה</h2>
            <Table className="table table-bordered">
              <TableHead>
                <TableRow style={{ borderColor: "#C1121F" }} className="table-row">
                  <TableCell align="center">שם מוצר</TableCell>
                  <TableCell align="center" style={{ width: 50 }}>מחיר</TableCell>
                  <TableCell align="center" style={{ width: 70 }}>כמות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedUser?.products?.map((product) => {
                  return (
                    <TableRow style={{ borderColor: "#C1121F" }} className="table-row"
                      key={product._id}>
                      <TableCell align="center">{product.name}</TableCell>
                      <TableCell align="center">{product.price}</TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableOrder;
