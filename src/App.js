import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login.js";
import Admin from "./pages/Admin.js";
import Facturador from "./pages/Facturador.js";
import Recepcion from "./pages/Recepcion.js";
import Proteccion from "./components/Proteccion.js";
import Logout from './components/Logout.js'
import OlvidoDeClave from './components/OlvidoDeClave.js'
import NotFound from "./components/NotFound.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* inicia el login la peticion a la BDD */}
      <Routes>
        <Route index path="/" element={<Login />} />
        {/* de acuerdo a su rol debe redireccionarlo a la ruta indicada */}
        <Route
          path="/admin/*"
          element={
            <Proteccion actor="admin">
              <Admin />
            </Proteccion>
          }
        />
        <Route
          path="/facturador/*"
          element={
            <Proteccion actor="facturador">
              <Facturador />
            </Proteccion>
          }
        />
        <Route
          path="/recepcion/*"
          element={
            <Proteccion actor="recepcion">
              <Recepcion />
            </Proteccion>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgottenPassword" element={<OlvidoDeClave />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
