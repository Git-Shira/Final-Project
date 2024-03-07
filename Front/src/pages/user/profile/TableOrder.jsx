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
    <div className="profile-user">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table className="table table-bordered"
          style={{
            maxWidth: 800,
          }}
        >
          <TableHead>
            <TableRow style={{ borderColor: "#C1121F" }} className="table-row">
              <TableCell align="center" style={{ width: 70 }}>מספר הזמנה</TableCell>{" "}
              <TableCell align="center" style={{ width: 70 }}>מחיר כולל</TableCell>
              <TableCell align="center" style={{ width: 70 }}>פרטי הזמנה</TableCell>
              <TableCell align="center" style={{ width: 70 }}>תאריך</TableCell>
              <TableCell align="center" style={{ width: 70 }}>אישור הזמנה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow style={{ borderColor: "#C1121F", borderRadius: 2 }}>
                <TableCell align="center" style={{ width: 11 }}>
                  {user._id}</TableCell> {/* Display userId */}
                {/* Display fullAddress */}
                <TableCell align="center" style={{ width: 11 }}>
                  {user.totalPrice}</TableCell>{" "}
                {/* Display totalPrice */}
                <TableCell align="center" style={{ width: 11 }}>

                  <Button onClick={() => handleOpenModal(user)}>
                    פרטי הזמנה
                  </Button>
                </TableCell>
                <TableCell align="center" style={{ width: 11 }}>
                  {user.date}</TableCell>
                <TableCell align="center" style={{ width: 11 }}>
                  מאושר</TableCell>
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
