import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { Container } from "@mui/system";
import TableOrder from "./TableOrder";
import AOS from 'aos';

import t1 from "../../../IMAGES/t1.png";
import t2 from "../../../IMAGES/t2.png";

const Profile = ({ id }) => {
  console.log("id", id);
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user?.user);

    AOS.init();
  }, []);

  console.log("id", user);

  return (
    <div style={{minHeight:610}}>

    <Container maxWidth="sm" >

      <div className="title-design">
        <img src={t1} alt="" className="t1" data-aos="fade-left" data-aos-duration="1000" />
        <h1 data-aos="flip-down" data-aos-duration="1000">ארכיון הזמנות</h1>
        <img src={t2} alt="" className="t2" data-aos="fade-right" data-aos-duration="1000" />
      </div>

      {/* <h1> פרטים</h1> */}
      <div>
        <h3>
          < span style={{ color: "white", fontWeight: "bold" }}>
            שם:
          </span>
          <span style={{ marginRight: 10 }}>
            {id?.fullName}
          </span>
        </h3>
        <h3>
          < span style={{ color: "white", fontWeight: "bold" }}>
            דוא"ל:
          </span>
          <span style={{ marginRight: 10 }}>
            {id?.email}
          </span></h3>
      </div>
      <TableOrder id={id} />

    </Container>
    </div>
  );
};

export default Profile;
