import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function NuevaOrden({ title }) {
  const [choice, setChoice] = useState("");
  const [pizzas, setPizzas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const navigate = useNavigate();

  const [orden, setOrden] = useState({
    cliente_cedula: "",
    nombre: "",
    pizzas: [],
    bebidas: [],
    direccion_entrega: "",
    telefono: "",
  });

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
    setOrden({ ...orden, [name]: value });
  }

  function HandlerChoice(e) {
    setChoice(e.target.value);
  }

  // carga todos los datos
  useEffect(() => {
    cargarBebidas();
    cargarPizzas();
  }, []);

  async function consultarClient(cedula) {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/clientes/" + cedula,
      {
        ...requestOptions,
        method: "GET"
      }
    );
    const { success, message } = await res.json();

    if (success) {
      if (choice === "Orden") navigate("/recepcion/ordenes", { replace: true });
      else navigate("/recepcion/pedidos", { replace: true });
    } else {
      navigate("/" + sessionStorage.getItem("rol") + "/newClient", {
        replace: true,
        state: {
          nombre: orden.nombre === "" ? "" : orden.nombre,
          cedula: orden.cliente_cedula === "" ? "" : orden.cliente_cedula,
          direccion: "",
          numero: orden.telefono === "" ? "" : orden.telefono,
          type: choice,
        },
      });
    } // fin else

    //console.log(success + " " + message )
  }

  async function registrarOrden(e) {
    e.preventDefault();

    // si es una orden
    if (choice === "Orden") {
      const data = await JSON.stringify({
        cliente_cedula: orden.cliente_cedula,
        nombre: orden.nombre,
        pizzas: orden.pizzas,
        bebidas: orden.bebidas,
      });
      // peticion a la api
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/ordenes",
        {
          ...requestOptions,
          method: "POST",
          body: data
        }
      );
      const { success, message } = await res.json();
      if (success) {
        swal(message, "You clicked the button!", "success");
        consultarClient(orden.cliente_cedula);
      } else {
        swal(message, "You clicked the button!", "warning");
      }
      //console.log(data);
    } else {
      // registra un pedido
      const data = await JSON.stringify({
        cliente_cedula: orden.cliente_cedula,
        nombre: orden.nombre,
        pizzas: orden.pizzas,
        bebidas: orden.bebidas,
        direccion_entrega: orden.direccion_entrega,
        telefono: orden.telefono,
      });
      // peticion a la api
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/entregas",
        {
          ...requestOptions,
          method: "POST",
          body: data
        }
      );
      const { success, message } = await res.json();
      if (success) {
        await swal(message, "You clicked the button!", "success");
        consultarClient(orden.cliente_cedula);
      } else await swal(message, "You clicked the button!", "success");
    }
  }

  function addPizza(pizzaName) {
    if (orden.pizzas.length === 0) {
      orden.pizzas.push({
        nombre: pizzaName,
        cant: 1,
      });
    } else {
      const indice = buscar(pizzaName, orden.pizzas);
      if (indice !== -1) {
        const pizza = orden.pizzas[indice];
        pizza.cant++;
        orden.pizzas[indice] = pizza;
      } else {
        orden.pizzas.push({
          nombre: pizzaName,
          cant: 1,
        });
      }
    }

    cargarPizzas();
  }

  function addBebida(bebidaName) {
    if (orden.bebidas.length === 0) {
      orden.bebidas.push({
        nombre: bebidaName,
        cant: 1,
      });
    } else {
      const indice = buscar(bebidaName, orden.bebidas);
      if (indice !== -1) {
        const bebida = orden.bebidas[indice];
        bebida.cant++;
        orden.bebidas[indice] = bebida;
      } else {
        orden.bebidas.push({
          nombre: bebidaName,
          cant: 1,
        });
      }
    }

    cargarBebidas();
  }

  function buscar(pizzaName, arrayList) {
    for (let i = 0; i < arrayList.length; i++) {
      if (arrayList[i].nombre === pizzaName) return i;
    }
    return -1;
  }

  function restarCantidad(index, arrayList) {
    if (arrayList[index].cant > 1)
      arrayList[index].cant = arrayList[index].cant - 1;
    else arrayList.splice(index, 1);
  }

  // cargar lista de pizzas
  async function cargarPizzas() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/menu/pizzas",
      {
        ...requestOptions,
        method: "GET"
      }
    );
    const { data } = await datos.json();
    setPizzas(data);
  }

  // cargar lista de bebidas
  async function cargarBebidas() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/menu/bebidas",
      {
        ...requestOptions,
        method: "GET",
      }
    );
    const { data } = await datos.json();
    setBebidas(data);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <select
          className="form-select-lg bg-dark text-white my-2"
          onChange={HandlerChoice}
        >
          <option value={""}>Selecciona el tipo de Encargo</option>
          <option value="Orden">Orden</option>
          <option value="Pedido">Pedido</option>
        </select>
        <h2 className="subtitle p-2 text-white rounded-2">
          {title + " " + (choice === "" ? "" : choice)}
        </h2>

        {choice !== "" && (
          <>
            <div className="col-sm-6">
              <div className="container text-center pt-2">
                <table className="table pizzas text-white bg-success rounded">
                  <thead>
                    <tr>
                      <th>Pizza</th>
                      <th>Precio</th>
                      <th>Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pizzas.map((pizza) => {
                      return (
                        <tr key={pizza.id}>
                          <td>{pizza.nombre}</td>
                          <td>{pizza.precio}$</td>
                          <td>
                            <button
                              className="btn btn-primary px-2 py-0"
                              onClick={() => {
                                addPizza(pizza.nombre);
                              }}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <table className="table bebidas text-white bg-success rounded">
                  <thead>
                    <tr>
                      <th>Bebida</th>
                      <th>Precio</th>
                      <th>Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bebidas.map((bebida) => {
                      return (
                        <tr key={bebida.id}>
                          <td>{bebida.nombre}</td>
                          <td>{bebida.precio}$</td>
                          <td>
                            <button
                              className="btn btn-primary px-2 py-0"
                              onClick={() => {
                                addBebida(bebida.nombre);
                              }}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="pt-2">
                <ul className="list-group pb-1">
                  <h5 className="text-white text-center">
                    {orden.pizzas.length === 0 ? "" : "Pizzas Añadidas"}
                  </h5>
                  {orden.pizzas.map((pizza) => {
                    return (
                      <li
                        key={orden.pizzas.indexOf(pizza)}
                        className="list-group-item bg-success p-0 rounded-2 text-white text-center"
                      >
                        {pizza.nombre + " x" + pizza.cant}
                        <button
                          className="btn btn-danger px-2 py-0 float-end"
                          onClick={() => {
                            restarCantidad(
                              orden.pizzas.indexOf(pizza),
                              orden.pizzas
                            );
                            cargarPizzas();
                          }}
                        >
                          <b>x</b>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <ul className="list-group">
                  <h5 className="text-white text-center">
                    {orden.bebidas.length === 0 ? "" : "Bebidas Añadidas"}
                  </h5>
                  {orden.bebidas.map((bebida) => {
                    return (
                      <li
                        key={orden.bebidas.indexOf(bebida)}
                        className="list-group-item bg-primary rounded-2 p-0 text-white text-center"
                      >
                        {bebida.nombre + " x" + bebida.cant}
                        <button
                          className="btn btn-danger px-2 py-0 float-end"
                          onClick={() => {
                            restarCantidad(
                              orden.bebidas.indexOf(bebida),
                              orden.bebidas
                            );
                            cargarBebidas();
                          }}
                        >
                          <b>x</b>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <form className="text-center" onSubmit={registrarOrden}>
                <div className="input-group my-2 text-center">
                  <input
                    type="text"
                    pattern="(V)[0-9]+"
                    className="form-control bg-dark text-white"
                    placeholder="Cedula ej: V12345678"
                    onChange={handlerFormChange}
                    name="cliente_cedula"
                    required
                  />
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    placeholder="Nombre del cliente"
                    onChange={handlerFormChange}
                    name="nombre"
                    required
                  />
                  {choice === "Pedido" && (
                    <div className="input-group my-2 text-center">
                      <input
                        type="tel"
                        pattern="[0-9]{11}"
                        className="form-control bg-dark text-white"
                        placeholder="Tlf: eje 04121234567"
                        onChange={handlerFormChange}
                        name="telefono"
                        required
                      />
                      <input
                        type="text"
                        className="form-control bg-dark text-white"
                        placeholder="Direccion de entrega"
                        onChange={handlerFormChange}
                        name="direccion_entrega"
                        required
                      />
                    </div>
                  )}
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value={"Registrar " + choice}
                    disabled={
                      orden.pizzas.length > 0 || orden.bebidas.length > 0
                        ? false
                        : true
                    }
                  />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NuevaOrden;
