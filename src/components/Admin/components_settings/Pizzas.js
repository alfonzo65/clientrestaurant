import { useEffect, useState } from "react";
import swal from "sweetalert";

function Pizzas({ title }) {
  const [misPizzas, setMisPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({
    nombre: "",
    precio: "",
    id: "",
  });

  useEffect(() => {
    cargarPizzas();
    document.getElementById("boton_edit").disabled = true;
    document.getElementById("boton_cancelar").disabled = true;
  }, []);

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
    setNewPizza({ ...newPizza, [name]: value });
  }

  // crear nueva pizza
  async function createNewPizza(e) {
    e.preventDefault();
    const data = await JSON.stringify({
      nombre: newPizza.nombre,
      precio: newPizza.precio,
    });
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/menu/pizzas",
      { ...requestOptions, method: "POST", body: data }
    );
    const { success } = await res.json();
    if (success === 1) {
      await swal(
        "Pizza Registrada Con Exito!",
        "You clicked the button!",
        "success"
      );
      setPizza({ nombre: "", precio: "", id: "" });
      cargarPizzas();
    } else {
      await swal(
        "Ocurrio un error al Intentar Registrar La Pizza!",
        "You clicked the button!",
        "warning"
      );
    }
  }

  // eliminar una pizza
  async function deletePizza(pizza_id) {
    const data = await JSON.stringify({ id: pizza_id });
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/menu/pizzas",
      { ...requestOptions, method: "DELETE", body: data }
    );
    const { success, message } = await res.json();
    if (success === 1) {
      await swal(message, "You clicked the button!", "success");
      cargarPizzas();
    } else {
      await swal(
        message + ", error al intentar Eliminar la Pizza",
        "You clicked the button!",
        "warning"
      );
    }
  }

  // establece una pizza
  function setPizza(pizza) {
    setNewPizza(pizza);
  }

  function validarCampos() {
    return newPizza.nombre === "" || ( newPizza.precio === "" || newPizza.precio < 0.1 ) ;
  }

  // actualiza una pizza
  async function updatePizza() {
    if (validarCampos()) {
      await swal("Asegurese de rellenar los campos correctamente!", "", "warning");
      return;
    }
    const data = await JSON.stringify({
      nombre: newPizza.nombre,
      precio: newPizza.precio,
      id: newPizza.id,
    });
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/menu/pizzas",
      { ...requestOptions, method: "PATCH", body: data }
    );
    const { success, message } = await res.json();
    if (success) {
      await swal(message, "You clicked the button!", "success");
      setPizza({ nombre: "", precio: "", id: "" });
      document.getElementById("boton_edit").disabled = true;
      document.getElementById("boton_cancelar").disabled = true;
      document.getElementById("boton_submit").disabled = false;
      cargarPizzas();
    } else {
      await swal(
        message + ", error al intentar Actualizar la Pizza",
        "You clicked the button!",
        "warning"
      );
    }
  }

  async function cargarPizzas() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/menu/pizzas",
      { ...requestOptions, method: "GET" }
    );
    const { data } = await datos.json();
    setMisPizzas(data);
  }

  function cancelarPizza() {
    setNewPizza({
      nombre: "",
      precio: "",
      id: "",
    });
    document.getElementById("boton_edit").disabled = true;
    document.getElementById("boton_cancelar").disabled = true;
    document.getElementById("boton_submit").disabled = false;
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
                <th>Precio</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {misPizzas.map((pizza) => {
                return (
                  <tr key={pizza.id}>
                    <td>{pizza.nombre}</td>
                    <td>{pizza.precio}$</td>
                    <td>
                      <button
                        className="boton_edit"
                        onClick={() => {
                          setPizza(pizza);
                          document.getElementById(
                            "boton_edit"
                          ).disabled = false;
                          document.getElementById(
                            "boton_submit"
                          ).disabled = true;
                          document.getElementById(
                            "boton_cancelar"
                          ).disabled = false;
                        }}
                      >
                        <span className="material-symbols-outlined">
                          settings
                        </span>
                      </button>
                      <button
                        className="boton_delete"
                        onClick={() => deletePizza(pizza.id)}
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
      <div className="col-md-12 text-white">
        <form onSubmit={createNewPizza}>
          <h2 className="text-center">Datos De La Pizza</h2>

          <div className="input-group my-2 text-center">
            <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="Nombre De La Pizza"
              value={newPizza.nombre === "" ? "" : newPizza.nombre}
              name="nombre"
              onChange={handlerFormChange}
              required
            />
            <input
              type="number"
              min={0.1}
              max={1000.0}
              step={0.1}
              className="form-control bg-dark text-white"
              placeholder="Precio"
              value={newPizza.precio === "" ? "" : newPizza.precio}
              name="precio"
              required
              onChange={handlerFormChange}
            />
          </div>
          <div className="btn-group my-2 text-center">
            <button type="submit" id="boton_submit" className="btn btn-success">
              Registrar Pizza
            </button>
            <button
              type="button"
              className="btn btn-danger"
              id="boton_cancelar"
              value="Cancelar"
              onClick={() => {
                cancelarPizza();
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              id="boton_edit"
              onClick={() => {
                updatePizza();
              }}
            >
              Actualizar Pizza
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Pizzas;
