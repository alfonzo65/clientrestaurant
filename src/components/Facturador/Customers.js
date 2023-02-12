import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";

function Customers({ title }) {
  const { token } = useContext(UserContext);
  const [clientes, setClientes] = useState([]);

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
                <th>Sector</th>
                <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => {
                return (
                  <tr key={cliente.cedula}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.cedula}</td>
                    <td>{cliente.direccion}</td>
                    <td>{cliente.numero}</td>
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

export default Customers;
