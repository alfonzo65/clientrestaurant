import { useState, useEffect } from "react";
import swal from "sweetalert";

function Providers({ title }) {
  const [proveedores, setProveedores] = useState([]);
  const [proveedoresTemp, setProveedoresTemp] = useState([]);
  const [rif, setRif] = useState("");

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
    if (success) {
      setProveedoresTemp(data);
      setProveedores(data);
    } else swal("Error en el servidor", "", "warning");

    if (data.length === 0) swal("No hay Proveedores Registrados");
  }

  async function buscarProveedor(e) {
    e.preventDefault();
    let array = [];
    let n = 0;

    if (rif) {
      for (let i = 0; i < proveedores.length; i++) {
        if (proveedores[i].rif === rif) {
          array[n] = proveedores[i];
          n++;
        }
      }
      setProveedores(array);
      if (array.length === 0)
        await swal(
          "No se encontraron resultados con este numero de rif " + rif,
          "",
          "warning"
        );
    } else {
      setProveedores(proveedoresTemp);
    }
  }

  function handlerRif(e) {
    setRif(e.target.value);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12">
          <form
            className="d-flex my-1"
            role="search"
            onSubmit={buscarProveedor}
          >
            <input
              className="form-control me-2"
              type="search"
              pattern="(V|J)[0-9]+"
              onChange={handlerRif}
              placeholder="Eje: J - V...123456789"
              aria-label="Search"
            />
            <input
              type="submit"
              className="btn btn-outline-primary"
              value="Buscar"
            />
          </form>
          <div className="tablero">
            <table className="table text-white text-center">
              <thead className="table-dark tablero_head">
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
    </div>
  );
}

export default Providers;
