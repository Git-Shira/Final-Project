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
  }, []);
  console.log(userData);
  return (
    <div>
<div className="title-design">
          <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
          <h1 data-aos="flip-down" data-aos-duration="1000">ארכיון הזמנות</h1>
          <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
        </div>
      
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
                <TableCell>אופן תשלום</TableCell>
                <TableCell>סוג איסוף</TableCell>
                <TableCell> תאריך</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.totalPrice}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                  <Button onClick={() => handleOpenModal(user)}>
                      פרטי הזמנה
                    </Button>
                  </TableCell>
                  <TableCell>מאושר</TableCell>
                  <TableCell>{user.typePay}</TableCell>
                  <TableCell>{user.typeCollect}</TableCell>
                  <TableCell>{user.date}</TableCell>
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
              {selectedUser?.products?.map((product, productIndex) => (
                  <TableRow key={productIndex}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                  </TableRow>
                ))}
                </TableBody>
            </Table>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default TableAdmin;
