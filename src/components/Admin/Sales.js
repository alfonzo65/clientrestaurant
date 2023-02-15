import { useState, useEffect } from "react";
import swal from "sweetalert";

function Sales({ title }) {
  const [facturas, setFacturas] = useState([]);
  const [ventas, setVentas] = useState(null);
  const [contador, setContador] = useState(null);
  const [detalles, setDetalles] = useState({
    cliente:"",
    descripcion: "",
    total: 0,
    direccion:""
  });
  const [mostrarDetalles, setMostrarDetalles] = useState(false);


  useEffect(() => {
    cargarVentas();
    ventasTotal();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarVentas() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/ventas",
      { ...requestOptions, method: "GET" }
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
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await res.json();
    if (success) {
      setVentas(data[0].total);
    } else console.log("error interno al consultar el total de ventas");
  }

  function mostrarResumen(sale) {
    setDetalles({ cliente: sale.cedula, descripcion: sale.descripcion, total: sale.total, direccion: sale.direccion });
    setMostrarDetalles(true);
  }

  return (
    <div className="container mt-2 rounded-1 position-relative">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              <li>Ventas Realizadas: {contador ? contador : 0}</li>
              <li>Monto total: {ventas ? ventas : 0}$</li>
            </ul>
          </div>

          <h2 className="text-center mt-1">Resumen de Ventas</h2>
          <div className="tablero">
            <table className="table text-white text-center">
              <thead className="table-dark tablero_head">
                <tr>
                  <th>Cliente</th>
                  <th>C.I</th>
                  <th className="ocultar">Sector</th>
                  <th className="ocultar">Description</th>
                  <th className="ocultar">Monto a Pagar</th>
                  <th>Fecha</th>
                  <th className="mostrar">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((venta) => {
                  venta.fecha = venta.fecha.substring(0, 10);
                  return (
                    <tr key={venta.id}>
                      <td>{venta.nombre}</td>
                      <td>{venta.cedula}</td>
                      <td className="ocultar">{venta.direccion}</td>
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
                      {mostrarDetalles && (
                        <div className="mostrar_div">
                          <span
                            className="boton_detalles_close"
                            onClick={() => {
                              setMostrarDetalles(false);
                            }}
                          >
                            X
                          </span>
                          <h4>Detalles de la Venta</h4>
                          <p>
                            Cedula: {detalles.cliente}<br/>
                            Direccion: {detalles.direccion}<br/>
                            Descripcion: {detalles.descripcion}
                            <br />
                            Monto a Pagar: {detalles.total}$
                          </p>
                        </div>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
