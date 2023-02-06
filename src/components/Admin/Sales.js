import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";

function Sales({ title }) {
  const { token } = useContext(UserContext);
  const [facturas, setFacturas] = useState([]);
  const [ventas, setVentas] = useState(null);
  const [contador, setContador] = useState(null);

  useEffect(() => {
    cargarVentas();
    ventasTotal();
  }, []);

  async function cargarVentas() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/ventas",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success, data } = await res.json();

    if (!success) swal("Ocurrio un error al cargar las facturas");
    else {
      setFacturas(data);
      setContador(data.length);
    }

    if (data.length === 0) swal("No hay Facturas De Ventas");
  }

  async function ventasTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/ventas/total",
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
      setVentas(data[0].total);
    } else console.log("error interno al consultar el total de ventas");
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              <li>Ventas Realizadas: { contador ? contador : 0 }</li>
              <li>Monto total: { ventas ? ventas : 0 }$</li>
            </ul>
          </div>

          <h2 className="text-center mt-1">Resumen de Ventas</h2>
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>C.I</th>
                <th>Sector</th>
                <th>Description</th>
                <th>Monto a Pagar</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((venta) => {
                venta.fecha = venta.fecha.substring(0, 10);
                return (
                  <tr key={venta.id}>
                    <td>{venta.nombre}</td>
                    <td>{venta.cedula}</td>
                    <td>{venta.direccion}</td>
                    <td>{venta.descripcion}</td>
                    <td>{venta.total}$</td>
                    <td>{venta.fecha}</td>
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

export default Sales;
