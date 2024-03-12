import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Edit from "../../pages/admin/management/edit/Edit";
import Management from "../../pages/admin/management/Management";
import TableAdmin from "../../pages/admin/management/TableAdmin";
import ViewUsers from "../../pages/admin/management/ViewUsers";

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/Management" element={<Management />} />
        <Route path="/TableAdmin" element={<TableAdmin />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/ViewUsers" element={<ViewUsers/>} />
      </Routes>
    </div>
  );
};

export default AdminRoute;