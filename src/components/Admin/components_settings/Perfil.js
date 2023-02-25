import { useEffect, useState } from "react";
import swal from "sweetalert";

function Perfil({ title }) {
  useEffect(() => {
    cargarDatos();
  }, []);

  const [misDatos, setMisDatos] = useState({
    nombre: "",
    email: "",
    cedula: "",
    contrasena: "",
    rol: "",
  })

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  function handlerFormChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setMisDatos({ ...misDatos, [name]: value });
  }

  async function cargarDatos() {
    const data = await fetch(process.env.REACT_APP_URL_BACKENDSERVER+"/api/users/me", {
      ...requestOptions,
      method: "POST",
    });
    const { user } = await data.json();
    setMisDatos({
      nombre: user.nombre,
      email: user.email,
      cedula: user.cedula,
      contrasena: user.contrasena,
      rol:sessionStorage.getItem("rol")
    });
  }

  async function handlerUpdateUser(e) {
    e.preventDefault()
    const datos = await JSON.stringify(misDatos);
    const data = await fetch(process.env.REACT_APP_URL_BACKENDSERVER+"/api/users", {
      ...requestOptions,
      method: "PATCH",
      body: datos,
    });
    const { success, message } = await data.json();
    if (success) {
      await swal(message, "You clicked the button!", "success");
    } else {
      await swal(
        "Error cedula no registrada",
        "You clicked the button!",
        "warning"
      );
    }
    cargarDatos()
  }

  return (
    <div className="row users_table mt-2 p-2">
      <h2 className="text-white text-center">{title}</h2>
      <div className="col-md-12">
        <form onSubmit={handlerUpdateUser}>
          <div className="input-group my-2 text-center">
            <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="Nombre"
              name="nombre"
              onChange={handlerFormChange}
              value={misDatos.nombre === "" ? "" : misDatos.nombre}
            />
            <input
              type="email"
              className="form-control bg-dark text-white"
              placeholder="Email"
              name="email"
              onChange={handlerFormChange}
              value={misDatos.email === "" ? "" : misDatos.email}
            />
          </div>
          <div className="input-group my-2 text-center">
            <input
              type="password"
              className="form-control bg-dark text-white"
              placeholder="Password"
              name="contrasena"
              value={ misDatos.contrasena ? misDatos.contrasena : "" }
              onChange={handlerFormChange}
            />
            <input
              type="text"
              pattern="(V)[0-9]+"
              className="form-control bg-dark text-white"
              placeholder="Cedula ej: V123456789"
              name="cedula"
              onChange={handlerFormChange}
              value={misDatos.cedula === "" ? "" : misDatos.cedula}
            />
          </div>
          <div className="alert alert-danger p-1 m-0 text-center" role="alert">
            Si necesitas modificar tu clave solo ingrese una nueva
            clave
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
