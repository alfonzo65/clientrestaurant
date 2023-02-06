import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext.js";

function Perfil({ title }) {

  const { token } = useContext(UserContext)

  useEffect(()=>{
    cargarDatos()
  },[])

  const [ misDatos , setMisDatos ] = useState({
    nombre:"",
    email:"",
    cedula:""
  })

  // guarda los datos de los inputs del formulario
  function handlerFormChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setMisDatos({ ...misDatos, [name]: value });
  }

  async function cargarDatos(){
    const data = await fetch('https://luzpizstore.onrender.com/api/users/me',{
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    const { user } = await data.json()
    setMisDatos({ 
      nombre: user.nombre,
      email: user.email,
      cedula: user.cedula
     })
  }

  return (
      <div className="row users_table mt-2 p-2">
        <h2 className="text-white text-center">{title}</h2>
        <div className="col-md-12">
          <form>
            <div className="input-group my-2 text-center">
              <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="Nombre"
                name="nombre"
                onChange={handlerFormChange}
                value={( misDatos.nombre === "" ? "" : misDatos.nombre )}
              />
              <input
                type="email"
                className="form-control bg-dark text-white"
                placeholder="Email"
                name="email"
                onChange={handlerFormChange}
                value={( misDatos.email === "" ? "" : misDatos.email )}
              />
            </div>
            <div className="input-group my-2 text-center">
              {/* <input
                type="password"
                className="form-control bg-dark text-white"
                placeholder="Password"
              /> */}
              <input
                type="text"
                pattern="(V)[0-9]+"
                className="form-control bg-dark text-white"
                placeholder="Cedula ej: V123456789"
                name="cedula"
                onChange={handlerFormChange}
                value={( misDatos.cedula === "" ? "" : misDatos.cedula )}
              />
            </div>
            <div className="input-group my-2 text-center">
              <input
                type="submit"
                className="btn btn-outline-primary"
                value="Actualizar Datos"
              />
            </div>
          </form>
        </div>
      </div>
  );
}

export default Perfil;