import { useState, useEffect } from "react";
import swal from "sweetalert";

function Providers({ title }) {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    cargarProveedores();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarProveedores() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/provedores",
      {
        ...requestOptions,
        method: "GET",
      }
    );
    const { success, data } = await res.json();
    if (success) setProveedores(data);
    else swal("Error en el servidor", "", "warning");

    if (data.length === 0) swal("No hay Proveedores Registrados");
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12">
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Proveedor</th>
                <th>Rif</th>
                <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => {
                return (
                  <tr key={proveedor.rif}>
                    <td>{proveedor.nombre}</td>
                    <td>{proveedor.rif}</td>
                    <td>{proveedor.numero}</td>
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

export default Providers;
