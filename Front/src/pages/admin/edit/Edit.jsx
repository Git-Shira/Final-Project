import React from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const Edit = ({ product }) => {
  console.log(product);
  const [editproduct, setEditProduct] = React.useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    image: product.image || "",
    category: product.category || "",
    amount: product.amount || "",
  });

  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
      const response = await axios.put(
        `http://localhost:3000/products/update/${product._id}`,
        editproduct
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box component="form">
        <TextField
          id="outlined-basic"
          label="שם מלא"
          variant="outlined"
          onChange={(e) =>
            setEditProduct({ ...editproduct, name: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="תיאור"
          variant="outlined"
          onChange={(e) =>
            setEditProduct({ ...editproduct, description: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="מחיר"
          type="number"
          variant="outlined"
          value={product.price}
          onChange={(e) =>
            setEditProduct({ ...editproduct, price: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="תמונה"
          variant="outlined"
          onChange={(e) =>
            setEditProduct({ ...editproduct, image: e.target.value })
          }
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="כמות"
          variant="outlined"
          value={product.amount}
          onChange={(e) =>
            setEditProduct({ ...editproduct, amount: e.target.value })
          }
        />
      </Box>
      <Button variant="contained" type="submit">
        Edit
      </Button>
    </form>
  );
};

export default Edit;
