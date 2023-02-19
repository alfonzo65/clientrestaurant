import { useEffect, useState } from "react";
import swal from "sweetalert";

function Users({ title }) {
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    rol: "",
    cedula: "",
    contrasena: "",
  });

  useEffect(() => {
    cargarUsuarios();
    document.getElementById("boton_cancelar").disabled = true;
    document.getElementById("boton_edit").disabled = true;
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  // guarda los datos de los inputs del formulario
  function handlerFormChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  }

  // selecciona los datos de un usuario con el boton de rueda mecanica
  // para ser reflejados en el form y luego actualizarlos
  async function handlerUpdateUser(user) {
    setNewUser(user);
    const datos = await JSON.stringify(newUser);
    const data = await fetch("https://luzpizstore.onrender.com/api/users", {
      ...requestOptions,
      method: "PATCH",
      body: datos,
    });
    const { success, message } = await data.json();
    if (success) {
      swal(message, "You clicked the button!", "success");
      handlerReset();
      cargarUsuarios();
      document.getElementById("boton_cancelar").disabled = true;
      document.getElementById("boton_edit").disabled = true;
    } else {
      await swal(
        "Error cedula no registrada",
        "You clicked the button!",
        "warning"
      );
    }
  }

  // crea un usuario nuevo
  async function handlerSubmit(e) {
    e.preventDefault();
    const new_user = await JSON.stringify(newUser);
    const res = await fetch("https://luzpizstore.onrender.com/api/users", {
      ...requestOptions,
      method: "POST",
      body: new_user,
    });
    const result = await res.json();
    if (result.success) {
      await swal(
        "Usuario Registrado Exitosamente!",
        "You clicked the button!",
        "success"
      );
      handlerReset();
      cargarUsuarios();
    } else {
      await swal(
        "Este Email o Cedula ya esta Registrado!",
        "You clicked the button!",
        "warning"
      );
    }
  }

  // eliminar un usuario
  async function handlerDelete(id) {
    const data = await JSON.stringify({ cedula: id });
    const res = await fetch("https://luzpizstore.onrender.com/api/users", {
      ...requestOptions,
      method: "DELETE",
      body: data,
    });
    const respuesta = await res.json();
    if (respuesta.success) {
      await swal(respuesta.message, "You clicked the button!", "success");
      cargarUsuarios();
    } else {
      await swal("Error interno en el servidor");
    }
  }

  // reinicia los inputs en estado vacio y desactiva los botones cancel y edit
  function handlerReset() {
    document.getElementById("boton_cancelar").disabled = true;
    document.getElementById("boton_edit").disabled = true;
    document.getElementById("boton_crear").disabled = false;
    setNewUser({
      nombre: "",
      email: "",
      rol: "",
      cedula: "",
      contrasena: "",
    });
  }

  async function cargarUsuarios() {
    const datos = await fetch("https://luzpizstore.onrender.com/api/users", {
      ...requestOptions,
      method: "GET",
    });
    const arrayUsuarios = await datos.json();
    // aqui manejo la contrasenia
    setUsuarios(arrayUsuarios.data); /// modificado
  }

  return (
    <div className="row users_table mt-2">
      <h2 className="text-center text-white p-2">{title}</h2>
      <div className="col-md-12">
        <div className="tablero">
          <table className="table table-sm text-white text-center">
            <thead className="table-dark tablero_head">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Cedula</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => {
                return (
                  <tr key={user.cedula}>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td>{user.rol}</td>
                    <td>{user.cedula}</td>
                    <td>
                      <button
                        className="boton_edit"
                        onClick={() => {
                          document.getElementById(
                            "boton_crear"
                          ).disabled = true;
                          document.getElementById(
                            "boton_cancelar"
                          ).disabled = false;
                          document.getElementById(
                            "boton_edit"
                          ).disabled = false;
                          setNewUser(user);
                        }}
                      >
                        <span className="material-symbols-outlined">
                          settings
                        </span>
                      </button>
                      <button
                        className="boton_delete"
                        onClick={() => {
                          handlerDelete(user.cedula);
                        }}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-12 text-white div_form">
        <form onSubmit={handlerSubmit}>
          <h2 className="text-center">Datos del usuario</h2>

          <div className="input-group my-2 text-center">
            <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="Nombre"
              name="nombre"
              onChange={handlerFormChange}
              value={newUser.nombre === "" ? "" : newUser.nombre}
              required
            />
            <input
              type="email"
              className="form-control bg-dark text-white"
              placeholder="Email"
              name="email"
              onChange={handlerFormChange}
              value={newUser.email === "" ? "" : newUser.email}
              required
            />
          </div>
          <div className="input-group my-2 text-center">
            <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="Password"
              name="contrasena"
              value={ newUser.contrasena ? newUser.contrasena : "" }
              onChange={handlerFormChange}
              required
            />
            <input
              type="text"
              pattern="(V)[0-9]+"
              className="form-control bg-dark text-white"
              placeholder="Cedula ej: V12345678"
              name="cedula"
              onChange={handlerFormChange}
              value={newUser.cedula === "" ? "" : newUser.cedula}
              required
            />
          </div>
          <div className="input-group my-2 text-center">
            <select
              className="form-select selectRol bg-dark"
              name="rol"
              required
              onChange={handlerFormChange}
              value={newUser.rol === "" ? "" : newUser.rol}
            >
              <option value="">Selecciona el tipo de Rol...</option>
              <option value="facturador">Facturador</option>
              <option value="recepcion">Recepcion</option>
            </select>
          </div>
          <div className="alert alert-danger p-1 m-0 text-center" role="alert">
            Si necesita modificar la clave de un usuario solo ingrese una nueva clave
          </div>
          <div className="btn-group my-1 text-center">
            <button
              type="submit"
              className="btn btn-success btnU"
              id="boton_crear"
            >
              Crear
            </button>
            <button
              type="button"
              className="btn btn-danger btnU"
              id="boton_cancelar"
              onClick={() => {
                handlerReset();
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary btnU"
              id="boton_edit"
              onClick={() => {
                handlerUpdateUser(newUser);
              }}
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Users;
