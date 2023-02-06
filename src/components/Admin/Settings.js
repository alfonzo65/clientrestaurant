import { Route, Routes } from "react-router-dom";
import NavSettings from '../Admin/components_settings/NavSettings.js'
import Perfil from '../Admin/components_settings/Perfil'
import Users from '../Admin/components_settings/Users.js' 
import Pizzas from '../Admin/components_settings/Pizzas.js'
import Bebidas from '../Admin/components_settings/Bebidas.js' 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings({title}) {
    


    return(
        <div className="container mt-2 rounded-1">
            <div className="row">
                <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
                <div className="col-md-3">
                    <NavSettings/>
                </div>
                <div className="col-md-9">
                    <Routes>
                        <Route path="/perfil" element={<Perfil title="Mi Perfil" />} />
                        <Route path="/users" element={<Users title="Lista De Usuarios" />} />
                        <Route path="/pizzas" element={<Pizzas title="Lista de Pizzas" />} />
                        <Route path="/bebidas" element={<Bebidas title="Lista de Bebidas" />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}



export default Settings;