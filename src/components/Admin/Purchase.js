import { useState, useEffect } from "react";
import swal from "sweetalert";

function Purchase({ title }) {
  const [rif, setRif] = useState("")
  const [ facturasTemp , setFacturasTemp] = useState([])
  const [facturas, setFacturas] = useState([]);
  const [compras, setCompras] = useState(null);
  const [contador, setContador] = useState(0);
  const [detalles, setDetalles] = useState({
    proveedor: "",
    descripcion: "",
    total: 0,
  });
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

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

  async function buscarFacturas(e){
    e.preventDefault()
    let array = []
    let n = 0

    if( rif ){
      for (let i = 0; i < facturas.length; i++) {
        if( facturas[i].rif === rif ){
          array[n] = facturas[i]
          n++
        }
      }
      setFacturas(array)
      if( array.length === 0 )
         await swal("No se encontraron resultados con este rif " + rif, "", "warning" )
    } else {
      setFacturas(facturasTemp)
    }

  }

  function handlerRif(e){
    setRif(e.target.value)
  }

  async function cargarCompras() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/compras",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await res.json();
    if (!success)
      swal("Ocurrio un error en el servidor al cargar las facturas");
    else {
      setFacturasTemp(data)
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

  function mostrarResumen(purchase) {
    setDetalles({
      proveedor: purchase.rif,
      descripcion: purchase.descripcion,
      total: purchase.total,
    });
    setMostrarDetalles(true);
  }

  return (
    <div
      className="container mt-2 rounded-1 position-relative"
      id="container_tabla"
    >
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              <li>Compras Realizadas: {contador ? contador : 0}</li>
              <li>Monto Total: {compras ? compras : 0}$</li>
            </ul>
          </div>
          
            <form className="d-flex" role="search" onSubmit={buscarFacturas} >
              <input
                className="form-control me-2"
                type="search"
                pattern="(J|V)[0-9]{9}"
                onChange={handlerRif}
                placeholder="Eje: J or V ...123456789"
                aria-label="Search"
              />
              <input type="submit" className="btn btn-outline-primary" value="Buscar"/>
            </form>
         

          <h2 className="text-center mt-1">Resumen de Compras</h2>
          <div className="tablero">
            <table className="table text-white text-center">
              <thead className="table-dark tablero_head">
                <tr>
                  <th>Proveedor</th>
                  <th>Rif</th>
                  <th className="ocultar">Description</th>
                  <th className="ocultar">Monto a Pagar</th>
                  <th>Fecha</th>
                  <th className="mostrar">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((compra) => {
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
                <h4>Detalles de la Compra</h4>
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
    </div>
  );
}

export default Purchase;
