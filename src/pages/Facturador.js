import Header from "../components/Header.js";
import Navbar from "../components/NavbarFacturador.js"
import Facturas from "../components/Facturador/Facturas.js"
import Customers from "../components/Facturador/Customers.js"
import Providers from "../components/Facturador/Providers.js"
import NewInvoice from "../components/Facturador/NewInvoice.js"
import Footer from '../components/Footer.js'

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../style/navigationAdmin.css";
import "../style/nuevaFactura.css"

function Facturador() {

  let navigate = useNavigate();

  useEffect(() => {
    navigate("facturas", { replace: true });
  }, []);


  return (
    <>
      <Header/>
      <Navbar/>
      <Routes>
          <Route path="/facturas" element={<Facturas title="Facturas"/>} />
          <Route path="/createInvoice" element={<NewInvoice title="Registrar Factura"/>} />
          <Route path="/customers" element={<Customers title="Clientes"/>} />
          <Route path="/providers" element={<Providers title="Proveedores"/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default Facturador;
