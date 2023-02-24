import Header from "../components/Header.js";
import Navbar from "../components/NavbarRecepcion.js";
import Menu from "../components/Admin/Menu.js";
import Ordenes from "../components/Admin/Ordenes.js"
import NuevaOrden from '../components/Recepcion/NuevaOrden.js'
import NewClient from '../components/Recepcion/NewClient.js'
import Pedidos from '../components/Recepcion/Pedidos.js'
import Footer from '../components/Footer.js'

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../style/nuevaOrden.css"
import "../style/pedidos.css"

function Recepcion() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("menu", { replace: true });
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/menu" element={<Menu title="Menu" />} />
        <Route path="/ordenes" element={<Ordenes title="Ordenes" />} />
        <Route path="/newOrden" element={<NuevaOrden title="Registrar "/>} />
        <Route path="/newClient" element={<NewClient title="Registrar Nuevo Cliente"/>} />
        <Route path="/pedidos" element={<Pedidos title="Pedidos"/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default Recepcion;
