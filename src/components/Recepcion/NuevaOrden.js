import { useEffect, useState } from "react";

function NuevaOrden({ title }) {
  const [choice, setChoice] = useState("");
  const [pizzas, setPizzas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [cedula, setCedula] = useState(null);

  function HandlerChoice(e) {
    setChoice(e.target.value);
  }

  function ManejadorCedula(e) {
    setCedula(e.target.value);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <select
          className="form-select bg-dark text-white mb-2"
          onChange={HandlerChoice}
        >
          <option value={""}>Selecciona el tipo de Encargo</option>
          <option value="Orden">Orden</option>
          <option value="Pedido">Pedido</option>
        </select>
        <h2 className="subtitle p-2 text-white rounded-2">
          {title + " " + (choice == "" ? "" : choice)}
        </h2>
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
                <tr>
                  <td>Pizza Napolitana</td>
                  <td>10$</td>
                  <td>
                    <button className="btn btn-primary px-2 py-0">+</button>
                  </td>
                </tr>
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
                <tr>
                  <td>Coca-Cola 1ltr</td>
                  <td>2$</td>
                  <td>
                    <button className="btn btn-primary px-2 py-0">+</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="pt-2">
            <h5 className="text-white text-center">Pizzas Añadida</h5>
            <ul className="list-group pb-1">
              <li className="list-group-item bg-success p-0 text-white">
                Pizza Napolitana
                <button className="btn btn-danger px-2 py-0 float-end">
                  <b>x</b>
                </button>
              </li>
            </ul>
            <h5 className="text-white text-center">Bebidas Añadida</h5>
            <ul className="list-group">
              <li className="list-group-item bg-info text-white p-0">
                Bebida
                <button className="btn btn-danger px-2 py-0 float-end">
                  <b>x</b>
                </button>
              </li>
            </ul>
          </div>

          <form className="text-center">
            <div className="input-group my-2 text-center">
              <input
                type="text"
                pattern="(V)-[0-9]+"
                className="form-control bg-dark text-white"
                placeholder="Cedula ej: V-12345678"
                onChange={ManejadorCedula}
                value={cedula ? cedula : ""}
              />
              <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="Nombre del cliente"
              />
              {choice == "Pedido" && (
                <div className="input-group my-2 text-center">
                  <input
                    type="tel"
                    pattern="[0-9]{11}"
                    className="form-control bg-dark text-white"
                    placeholder="Tlf: eje 04121234567"
                  />
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    placeholder="Direccion de entrega"
                  />
                </div>
              )}
            </div>
            <button className="btn btn-primary">Registrar {choice}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NuevaOrden;
