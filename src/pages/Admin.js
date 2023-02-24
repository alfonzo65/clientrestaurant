import Header from "../components/Header.js";
import Navbar from "../components/NavbarAdm.js";
import Dashboard from "../components/Admin/Dashboard.js";
import Purchase from "../components/Admin/Purchase.js";
import Sales from "../components/Admin/Sales.js";
import Menu from "../components/Admin/Menu.js";
import Ordenes from "../components/Admin/Ordenes.js";
import Delivery from "../components/Admin/Delivery.js";
import Settings from '../components/Admin/Settings.js'
import Footer from '../components/Footer.js'
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../style/navigationAdmin.css";
import "../style/dashboard.css";
import "../style/purchase.css";
import "../style/menu.css";
import "../style/ordenes.css";
import "../style/settings.css"
import "../style/logout.css"

function Admin() {
  let navigate = useNavigate();

  useEffect(() => {
    
    navigate("dashboard");

  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard title="Dashboard" />} />
        <Route path="/purchase" element={<Purchase title="Purchase" />} />
        <Route path="/sales" element={<Sales title="Sales" />} />
        <Route path="/menu" element={<Menu title="Menu" />} />
        <Route path="/ordenes" element={<Ordenes title="Ordenes" />} />
        <Route path="/delivery" element={<Delivery title="Delivery" />} />
        <Route path="/settings/*" element={<Settings title="Settings" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Admin;
