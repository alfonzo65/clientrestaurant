import { useState, useEffect } from "react";
import swal from "sweetalert";

function Facturas({ title }) {
  const [choice, setChoice] = useState("");
  const [compras, setCompras] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [detalles, setDetalles] = useState({
    proveedor: "",
    descripcion: "",
    total: 0,
  });
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

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

  function mostrarResumen(invoice) {
    setDetalles({
      proveedor: choice === "Venta" ? invoice.cedula : invoice.rif,
      descripcion: invoice.descripcion,
      total: invoice.total,
    });
    setMostrarDetalles(true);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <select
          className="form-select bg-dark text-white rounded-3 my-2"
          onChange={HandlerChoice}
        >
          <option value={""}>Selecciona el tipo de Factura</option>
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>

        <h2 className="subtitle p-2 text-white rounded-2">
          {title + (choice === "" ? "" : " De " + choice)}
        </h2>
        <div className="col-md-12">
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                {choice === "Venta" && (
                  <>
                    <th>Cliente</th>
                    <th>C.I</th>
                  </>
                )}

                {choice === "Compra" && (
                  <>
                    <th>Empresa</th>
                    <th>Rif</th>
                  </>
                )}

                {choice !== "" && (
                  <>
                    <th className="ocultar">descripcion</th>
                    <th className="ocultar">Monto</th>
                    <th>Fecha</th>
                    <th className="mostrar">Detalles</th>
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
                      <td className="ocultar">{compra.descripcion}</td>
                      <td className="ocultar">{compra.total}$</td>
                      <td>{compra.fecha}</td>
                      <td className="mostrar">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            mostrarResumen(compra);
                          }}
                        >
                          ver
                        </button>
                      </td>
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
                      <td className="ocultar">{venta.descripcion}</td>
                      <td className="ocultar">{venta.total}$</td>
                      <td>{venta.fecha}</td>
                      <td className="mostrar">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            mostrarResumen(venta);
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
            <div className="mostrar_div text-center text-white">
              <span
                className="boton_detalles_close"
                onClick={() => {
                  setMostrarDetalles(false);
                }}
              >
                X
              </span>
              <h4>Detalles de la { choice === "Venta" ? choice : "Compra"}</h4>
              <p>
                rif: {detalles.proveedor}
                <br />
                Descripcion: {detalles.descripcion}
                <br />
                Monto a Pagar: {detalles.total}$
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Facturas;
