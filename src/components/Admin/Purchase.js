import { useState, useEffect } from "react";
import swal from "sweetalert";

function Purchase({ title }) {
  const [facturas, setFacturas] = useState([]);
  const [compras, setCompras] = useState(null);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    cargarCompras();
    comprasTotal();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarCompras() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/compras",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await res.json();
    if (!success)
      swal("Ocurrio un error en el servidor al cargar las facturas");
    else {
      setFacturas(data);
      setContador(data.length);
    }

    if (data.length === 0) swal("No hay Facturas De Compras");
  }

  async function comprasTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/compras/total",
      { ...requestOptions, method: "GET" }
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
              <li>Compras Realizadas: {contador ? contador : 0}</li>
              <li>Monto Total: {compras ? compras : 0}$</li>
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
            <tbody className="">
              {facturas.map((compra) => {
                compra.fecha = compra.fecha.substring(0, 10);
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
