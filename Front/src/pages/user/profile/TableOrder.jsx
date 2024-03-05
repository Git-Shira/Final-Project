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
} from "@mui/material";
import axios from "axios";

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
    <div>
      <h2>הזמנה</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>מספר הזמנה</TableCell>{" "}
              {/* Replace with relevant user data */}
              {/* Replace with relevant user data */}
              <TableCell>מחיר כולל</TableCell>
              <TableCell>פרטי הזמנה</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>אישור הזמנה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow>
                <TableCell>{user._id}</TableCell> {/* Display userId */}
                {/* Display fullAddress */}
                <TableCell>{user.totalPrice}</TableCell>{" "}
                {/* Display totalPrice */}
                <TableCell>
                  <Button onClick={() => handleOpenModal(user)}>
                    פרטי הזמנה
                  </Button>
                </TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>מאושר</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                {selectedUser?.products?.map((product) => {
                  return (
                    <TableRow key={product._id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default TableOrder;
