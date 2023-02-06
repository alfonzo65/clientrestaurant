import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";

function NewClient({ title }) {
  const { token } = useContext(UserContext);
  const { state } = useLocation()
  const [ newClient, setNewClient ] = useState({
    cedula:"",
    nombre:"",
    direccion:"",
    numero:""
  })
  const [ type, setType] = useState("")
  const navigate = useNavigate()

  function handlerFormChange(e){
    const name = e.target.name;
    const value = e.target.value;
    setNewClient({ ...newClient, [name]:value})
  }

  useEffect(()=>{
    function verifyState(){
      if( state ){
        setNewClient({
          cedula: state.cedula,
          nombre: state.nombre,
          direccion: state.direccion,
          numero: state.numero
        })
        setType(state.type)
      }
    } 
    verifyState()
  },[])

  async function registerNewClient(e){
    e.preventDefault()
    const data = await JSON.stringify(newClient)
    const res = await fetch('https://luzpizstore.onrender.com/api/work/clientes',{
      method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: data
      })
      const { success, message } = await res.json()
      if( success ){
        swal( message, "You clicked the button!", "success" )
        if( type === "Orden" )
          navigate("/recepcion/ordenes",{replace:true})
        if( type === "Pedido")
          navigate("/recepcion/pedidos",{replace:true})
      }else{
        swal( message,  "You clicked the button!", "warning" )
      }
  }


  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12 text-white px-4 text-center">
          <form className="text-center" onSubmit={registerNewClient}>
            <div className="input-group my-2 text-center">
              <input
                type="text"
                className="form-control bg-dark text-white"
                name="nombre"
                placeholder="Nombre y Apellido"
                maxLength="18"
                onChange={handlerFormChange}
                value={ newClient.nombre === "" ? "" : newClient.nombre }
                required
              />
              {/* <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="Apellido"
                maxLength="18"
                required
              /> */}
            </div>
            <div className="input-group my-2 text-center">
              <input
                type="text"
                pattern="(V)[0-9]+"
                className="form-control bg-dark text-white"
                placeholder="Cedula ej: V12345678"
                name="cedula"
                onChange={handlerFormChange}
                value={ newClient.cedula === "" ? "" : newClient.cedula }
                required
              />
              <input
                type="tel"
                pattern="[0-9]{11}"
                className="form-control bg-dark text-white"
                placeholder="Tlf: eje 04121234567"
                name="numero"
                onChange={handlerFormChange}
                value={ newClient.numero === "" ? "" : newClient.numero }
                required
              />
            </div>
            <div className="input-group my-2 text-center">
              <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="Sector donde vive"
                onChange={handlerFormChange}
                maxLength="20"
                name="direccion"
                value={ newClient.direccion === "" ? "" : newClient.direccion }
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Registrar Cliente"  />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewClient;
