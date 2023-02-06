import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.js";

function Dashboard({ title }) {
  const { token } = useContext(UserContext);
  const [compras, setCompras] = useState(null);
  const [ventas, setVentas] = useState(null);
  const [pedidos, setPedidos] = useState(null);
  const [ordenes, setOrdenes] = useState(null);

  useEffect(() => {
    comprasTotal();
    ventasTotal();
    pedidosTotal();
  }, []);

  async function comprasTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/compras/total",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success, data } = await res.json();
    if (success) {
      setCompras(data[0].total);
    } else console.log("error interno al consultar el total de compras");
  }

  async function ventasTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/ventas/total",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success, data } = await res.json();
    if (success) {
      setVentas(data[0].total);
    } else console.log("error interno al consultar el total de Ventas");
  }

  async function pedidosTotal() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/confirmados/count",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const respuesta= await res.json();
    console.log(respuesta)
    // if (success) {
    //   setPedidos(data[0].total);
    // } else console.log("error interno al consultar el total de pedidos");
  }

  return (
    <>
      <div className="container mt-2 rounded-1">
        <div className="row">
          <h2 className="titleContent p-2 text-dark rounded-2">{title}</h2>

          <div className="col-md-6">
            <div className="card m-1 sales-card rounded-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-cash-register fs-1 bg-success p-3 rounded-5 text-white"></i>
                <h5 className="card-title mt-1">Sales</h5>
                {ventas && (
                  <h3 className="fs-3">
                    ${ventas}
                    <i className="fa-solid fa-caret-up text-success p-1 fs-3"></i>
                  </h3>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card m-1 purchase-card rounded-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-hand-holding-dollar fs-1 bg-danger p-3 rounded-5 text-white"></i>
                <h5 className="card-title mt-1 text-dark">Purchase</h5>
                {compras && (
                  <h3 className="fs-3 text-dark">
                    ${compras}
                    <i className="fa-solid fa-caret-down text-danger p-1 fs-3"></i>
                  </h3>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card m-1 delivery-card rounded-4">
              <div className="card-body text-center">
                <i className="fa-solid fa-truck-fast fs-1 bg-warning p-3 rounded-5 text-white"></i>
                <h5 className="card-title mt-1">Pedidos</h5>
                
                  <h3 className="fs-3">
                    pedidos
                    <i className="fa-solid fa-check text-success p-1 fs-3"></i>
                  </h3>
         
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card m-1 pedidos-card rounded-4 text-dark">
              <div className="card-body text-center">
                <i className="fa-solid fa-book-open-reader fs-1 p-3 rounded-5 text-white" style="background-color: #9600E0;"></i>
                <h5 className="card-title mt-1">Ordenes</h5>
                <h3 className="fs-3">
                  Count
                  <i className="fa-solid fa-check text-success p-1 fs-3"></i>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
