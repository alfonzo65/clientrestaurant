import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";

function Delivery({ title }) {
  const { token } = useContext(UserContext);
  const [pedidos, setPedidos] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    cargarEntregas();
    pedidosTotal();
  }, []);

  async function cargarEntregas() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/confirmados",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success, data } = await res.json();
    if (success) setPedidos(data);
    else swal("Error interno con la api");
  }

  async function pedidosTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/confirmados/count",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success, data } = await res.json();
    if (success) {
      setTotal(data);
    } else console.log("error interno al consultar el total de pedidos");
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              {total && <li>Total Deliverys: {total}</li>}
            </ul>
          </div>

          <h2 className="text-center mt-1">Resumen de Envios</h2>
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>Cedula</th>
                <th>Direccion de Entrega</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => {
                pedido.fecha = pedido.fecha.substring(0, 10);
                return (
                  <tr key={pedido.id}>
                    <td>{pedido.nombre}</td>
                    <td>{pedido.cedula}</td>
                    <td>{pedido.direccion}</td>
                    <td>{pedido.fecha}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
