import { useState, useEffect } from "react";
import swal from "sweetalert";

function Sales({ title }) {
  const [cedula, setCedula] = useState("")
  const [ facturasTemp , setFacturasTemp] = useState([])
  const [facturas, setFacturas] = useState([]);
  const [ventas, setVentas] = useState(null);
  const [contador, setContador] = useState(null);
  const [detalles, setDetalles] = useState({
    cliente: "",
    descripcion: "",
    total: 0,
    direccion: "",
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

  async function buscarFacturas(e){
    e.preventDefault()
    let array = []
    let n = 0

    if( cedula ){
      for (let i = 0; i < facturas.length; i++) {
        if( facturas[i].cedula === cedula ){
          array[n] = facturas[i]
          n++
        }
      }
      setFacturas(array)
      if( array.length === 0 )
         await swal("No se encontraron resultados con este numero de cedula " + cedula, "", "warning" )
    } else {
      setFacturas(facturasTemp)
    }

  }

  async function cargarVentas() {
    const res = await fetch(
      process.env.REACT_APP_URL_BACKENDSERVER+"/api/work/ventas",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await res.json();
    if (!success) swal("Ocurrio un error al cargar las facturas");
    else {
      setFacturasTemp(data)
      setFacturas(data);
      setContador(data.length);
    }

    if (data.length === 0) swal("No hay Facturas De Ventas");
  }

  function handlerCedula(e){
    setCedula(e.target.value)
  }

  async function ventasTotal() {
    const res = await fetch(
      process.env.REACT_APP_URL_BACKENDSERVER+"/api/work/ventas/total",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await res.json();
    if (success) {
      setVentas(data[0].total);
    } else console.log("error interno al consultar el total de ventas");
  }

  function mostrarResumen(sale) {
    setDetalles({
      cliente: sale.cedula,
      descripcion: sale.descripcion,
      total: sale.total,
      direccion: sale.direccion,
    });
    setMostrarDetalles(true);
  }

  return (
    <div className="container mt-2 rounded-1 position-relative p-2">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              <li>Ventas Realizadas: {contador ? contador : 0}</li>
              <li>Monto total: {ventas ? ventas : 0}$</li>
            </ul>
          </div>
          <form className="d-flex" role="search" onSubmit={buscarFacturas} >
              <input
                className="form-control me-2"
                type="search"
                pattern="(V)[0-9]+"
                onChange={handlerCedula}
                placeholder="Eje: V12345678..."
                aria-label="Search"
              />
              <input type="submit" className="btn btn-outline-primary" value="Buscar"/>
            </form>

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
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {mostrarDetalles && (
              <div className="mostrar_div text-center">
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
                  Cedula: {detalles.cliente}
                  <br />
                  Direccion: {detalles.direccion}
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
    </div>
  );
}

export default Sales;
