
import { Navigate } from "react-router-dom"

function Proteccion({children,actor}){

    const rol = sessionStorage.getItem("rol")

    if( rol !== actor )
        return <Navigate to="/"/>

    return children;
}

export default Proteccion