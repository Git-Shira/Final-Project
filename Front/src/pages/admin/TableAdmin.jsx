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

const TableAdmin = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      debugger;
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
  }, []);
  console.log(userData);
  return (
    <div>
      <h2>הזמנה</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Container>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>מספר הזמנה</TableCell>{" "}
                {/* Replace with relevant user data */}
                {/* Replace with relevant user data */}
                <TableCell>מחיר כולל</TableCell>
                <TableCell>שם המזמין</TableCell>
                <TableCell>פרטי הזמנה</TableCell>
                <TableCell>אישור הזמנה</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.totalPrice}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    <Button onClick={handleOpenModal}>פרטי הזמנה</Button>
                  </TableCell>
                  <TableCell>מאושר</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      )}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div>
          <Box
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
          >
            <h2>פרטי הזמנה</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>שם מוצר</TableCell>
                  <TableCell>מחיר</TableCell>
                  <TableCell>כמות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {userData?.products?.map((product) => (
                  <TableRow>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default TableAdmin;
