import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";

function Purchase({ title }) {
  const { token } = useContext(UserContext);
  const [ facturas, setFacturas] = useState([]);
  const [ compras, setCompras ] = useState(null);

  useEffect(() => {
    cargarCompras();
    comprasTotal();
  }, []);

  async function cargarCompras() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/compras",
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
    else setFacturas(data);

    if (data.length === 0) swal("No hay Facturas De Compras");
  }

  async function comprasTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/compras/total",
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
      setCompras(data[0].total);
    } else console.log("error interno al consultar el total de compras");
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              <li>Compras Realizadas: {"Amount"}</li>
              {
                compras && (
                  <li>Monto Total: {compras}$</li>
                )
              }
              
            </ul>
          </div>

          <h2 className="text-center mt-1">Resumen de Compras</h2>
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Proveedor</th>
                <th>Rif</th>
                <th>Description</th>
                <th>Monto a Pagar</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((compra) => {
                compra.fecha = compra.fecha.substring(0,10)
                return (
                  <tr key={compra.id}>
                    <td>{compra.nombre}</td>
                    <td>{compra.rif}</td>
                    <td>{compra.descripcion}</td>
                    <td>{compra.total}$</td>
                    <td>{compra.fecha}</td>
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

export default Purchase;
