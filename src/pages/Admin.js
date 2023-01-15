import Header from "../components/Header.js";
import Navbar from "../components/Navbar.js";
import Dashboard from "../components/Admin/Dashboard.js";
import Purchase from "../components/Admin/Purchase.js";
import Sales from "../components/Admin/Sales.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../style/navigationAdmin.css";
import "../style/dashboard.css";
import "../style/purchase.css";

function Admin() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("dashboard", { replace: true });
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard title="Dashboard" />} />
        <Route path="/purchase" element={<Purchase title="Purchase" />} />
        <Route path="/sales" element={<Sales title="Sales" />} />
      </Routes>
    </>
  );
}

export default Admin;
