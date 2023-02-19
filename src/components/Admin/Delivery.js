import { useState, useEffect } from "react";
import swal from "sweetalert";

function Delivery({ title }) {
  const [pedidos, setPedidos] = useState([]);
  const [total, setTotal] = useState(null);
  const [detalles, setDetalles] = useState({
    cliente: "",
    direccion: "",
  });
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  useEffect(() => {
    cargarEntregas();
    pedidosTotal();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarEntregas() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/confirmados",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await res.json();
    if (success) setPedidos(data);
    else swal("Error interno con la api");
  }

  async function pedidosTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/confirmados/count",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await res.json();
    if (success) {
      setTotal(data);
    } else console.log("error interno al consultar el total de pedidos");
  }

  function mostrarResumen( pedido ) {
    setDetalles({
      cliente: pedido.cedula,
      direccion: pedido.direccion,
    });
    setMostrarDetalles(true);
  }

  return (
    <div className="container mt-2 rounded-1 position-relative">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              {total && <li>Total Deliverys: {total}</li>}
            </ul>
          </div>

          <h2 className="text-center mt-1">Resumen de Envios</h2>
          <div className="tablero">
            <table className="table text-white text-center">
              <thead className="table-dark tablero_head">
                <tr>
                  <th>Cliente</th>
                  <th>Cedula</th>
                  <th className="ocultar">Direccion de Entrega</th>
                  <th>Fecha</th>
                  <th className="mostrar">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => {
                  pedido.fecha = pedido.fecha.substring(0, 10);
                  return (
                    <tr key={pedido.id}>
                      <td>{pedido.nombre}</td>
                      <td>{pedido.cedula}</td>
                      <td className="ocultar">{pedido.direccion}</td>
                      <td>{pedido.fecha}</td>
                      <td className="mostrar">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            mostrarResumen(pedido);
                          }}
                        >
                          ver
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {mostrarDetalles && (
              <div className="mostrar_div text-center">
                <span
                  className="boton_detalles_close"
                  onClick={() => {
                    setMostrarDetalles(false);
                  }}
                >
                  X
                </span>
                <h4>Detalles de la Entrega</h4>
                <p>
                  Cedula: {detalles.cliente}
                  <br />
                  Direccion: {detalles.direccion}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
