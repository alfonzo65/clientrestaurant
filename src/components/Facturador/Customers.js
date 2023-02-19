import { useState, useEffect } from "react";
import swal from "sweetalert";

function Customers({ title }) {
  const [clientes, setClientes] = useState([]);
  const [detalles, setDetalles] = useState({
    direccion:"",
    numero:""
  });
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarClientes() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/clientes",
      {
        ...requestOptions,
        method: "GET",
      }
    );
    const { success, data } = await res.json();
    if (success) setClientes(data);
    else swal("Error en el servidor", "", "warning");

    if (data.length === 0) swal("No hay Clientes Registrados");
  }

  function mostrarResumen(cliente) {
    setDetalles({
      direccion: cliente.direccion,
      numero: cliente.numero,
    });
    setMostrarDetalles(true);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12">
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>C.I</th>
                <th className="ocultar">Sector</th>
                <th className="ocultar">Telefono</th>
                <th className="mostrar">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => {
                return (
                  <tr key={cliente.cedula}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.cedula}</td>
                    <td className="ocultar">{cliente.direccion}</td>
                    <td className="ocultar">{cliente.numero}</td>
                    <td className="mostrar">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            mostrarResumen(cliente);
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
              <h4>Detalles del Cliente</h4>
              <p>
                Direccion: {detalles.direccion}
                <br />
                telefono: {detalles.numero}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;
