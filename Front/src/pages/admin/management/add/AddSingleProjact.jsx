import React from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const AddSingleProjact = ({ setOpen }) => {
  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    amount: "",
  });
  const [age, setAge] = React.useState("");

  const AddProjact = async () => {
    debugger;
    const updateProduct = {
      ...product,
      category: age,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/products/add",
        updateProduct
      );
      console.log(response.data);

      alert("המוצר נוסף בהצלחה");
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <form onSubmit={AddProjact}>
      <Box component="form">
        <TextField
          id="outlined-basic"
          label="שם מלא"
          variant="outlined"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="תיאור"
          variant="outlined"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="מחיר"
          type="number"
          variant="outlined"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="תמונה"
          variant="outlined"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
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
          onChange={(e) => setProduct({ ...product, amount: e.target.value })}
        />
      </Box>
      <Button type="submit" autoFocus>
        Add
      </Button>
    </form>
  );
};

export default AddSingleProjact;
