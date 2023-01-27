import { useContext } from "react";
import { UserContext } from "../context/UserContext.js";
import { Navigate, Outlet } from "react-router-dom"

function Proteccion({children,actor}){

    const { rol } = useContext(UserContext)

    if( rol !== actor )
        return <Navigate to="/"/>

    return children;
}

export default Proteccion