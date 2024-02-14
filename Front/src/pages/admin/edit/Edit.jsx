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

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
      const response = await axios.put(
        `http://localhost:3000/products/update/${product._id}`,
        editproduct
      );

      alert("המוצר עודכן בהצלחה");
      handleEditSuccess();
      console.log(response.data);

      // Clear the form after successful submission
      setEditProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        amount: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box key={product._id} component="form">
        <TextField
          id="outlined-basic"
          label="שם מלא"
          variant="outlined"
          fullWidth
          required
          value={editproduct.name}
          onChange={(e) =>
            setEditProduct({ ...editproduct, name: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="תיאור"
          variant="outlined"
          fullWidth
          required
          value={editproduct.description}
          onChange={(e) =>
            setEditProduct({ ...editproduct, description: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="מחיר"
          type="number"
          variant="outlined"
          fullWidth
          required
          value={editproduct.price}
          onChange={(e) =>
            setEditProduct({ ...editproduct, price: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="תמונה"
          variant="outlined"
          fullWidth
          value={editproduct.image}
          onChange={(e) =>
            setEditProduct({ ...editproduct, image: e.target.value })
          }
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="קטגוריה"
            fullWidth
            required
            value={editproduct.category}
            onChange={(e) =>
              setEditProduct({ ...editproduct, category: e.target.value })
            }
          >
            <MenuItem value={"first"}>מנות ראשונות</MenuItem>
            <MenuItem value={"soup"}>מרקים</MenuItem>
            <MenuItem value={"sushi"}>סושי ספיישל</MenuItem>
            <MenuItem value={"nigiri"}>ניגירי</MenuItem>
            <MenuItem value={"sashimi"}>סשימי</MenuItem>
            <MenuItem value={"combinations"}>קומבינציות</MenuItem>
            <MenuItem value={"party"}>מגשי מסיבה</MenuItem>
            <MenuItem value={"buns"}>באנים</MenuItem>
            <MenuItem value={"sauteed"}>מוקפצים</MenuItem>
            <MenuItem value={"main"}>עיקריות</MenuItem>
            <MenuItem value={"salads"}>סלטים</MenuItem>
            <MenuItem value={"vegan"}>תפריט טבעוני</MenuItem>
            <MenuItem value={"children"}>ילדים</MenuItem>
            <MenuItem value={"desserts"}>קינוחים</MenuItem>
            <MenuItem value={"drinks"}>משקאות</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          id="outlined-basic"
          label="כמות"
          variant="outlined"
          fullWidth
          required
          value={editproduct.amount}
          onChange={(e) =>
            setEditProduct({ ...editproduct, amount: e.target.value })
          }
        /> */}
      </Box>
      <Button variant="contained" type="submit">
        עדכן
      </Button>
    </form>
  );
};

export default Edit;
