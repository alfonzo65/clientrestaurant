import { useState, useEffect } from "react";
import swal from "sweetalert";

function Facturas({ title }) {
  const [choice, setChoice] = useState("");
  const [compras, setCompras] = useState([]);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    if (choice === "Compra") cargarCompras();

    if (choice === "Venta") cargarVentas();
  }, [choice]);

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
      {
        ...requestOptions,
        method: "GET",
      }
    );
    const { success, data } = await res.json();
    if (!success) swal("Ocurrio un error al cargar las facturas");
    else setCompras(data);

    if (data.length === 0) swal("No hay Facturas De Compras");
  }

  async function cargarVentas() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/ventas",
      {
        ...requestOptions,
        method: "GET",
      }
    );
    const { success, data } = await res.json();

    if (!success) swal("Ocurrio un error al cargar las facturas");
    else setVentas(data);

    if (data.length === 0) swal("No hay Facturas De Ventas");
  }

  function HandlerChoice(e) {
    setChoice(e.target.value);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <select
          className="form-select bg-dark text-white mb-2"
          onChange={HandlerChoice}
        >
          <option value={""}>Selecciona el tipo de Factura</option>
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>
        <h2 className="subtitle p-2 text-white rounded-2">
          {title + (choice == "" ? "" : " De " + choice)}
        </h2>
        <div className="col-md-12">
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                {choice === "Venta" && (
                  <>
                    <th>Cliente</th>
                    <th>C.I</th>
                    <th>Sector Donde Reside</th>
                  </>
                )}

                {choice === "Compra" && (
                  <>
                    <th>Nombre de la Empresa</th>
                    <th>Rif</th>
                  </>
                )}

                {choice !== "" && (
                  <>
                    <th>descripcion</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {choice === "Compra" &&
                compras.map((compra) => {
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

              {choice === "Venta" &&
                ventas.map((venta) => {
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

export default Facturas;
