import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";

function Ordenes({ title }) {
  const { token } = useContext(UserContext);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  async function cargarPedidos() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/work/entregas",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success, data } = await datos.json();
    if (success) setPedidos(data);

    if (data.length === 0) swal("No hay Pedidos", "", "warning");
  }

  async function cancelarPedido(idPedido) {
    const data = await JSON.stringify({ id: idPedido });
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/entregas",
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: data,
      }
    );
    const { success, message } = await res.json();
    if (success) swal(message, "You clicked the button!", "success");
    else swal(message, "You clicked the button!", "warning");

    cargarPedidos();
  }

  async function confirmarEntrega( idPedido ) {
    const data = await JSON.stringify({ id: idPedido });
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/confirmar",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: data,
      }
    );
    const { success, message } = await res.json();
    if (success) swal(message, "You clicked the button!", "success");
    else swal(message, "You clicked the button!", "warning");

    cargarPedidos();
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-sm-12 text-center text-white">
          <div className="grid-container">
            {pedidos.map((pedido) => {
              return (
                <div className="text-center grid-item" key={pedido.id}>
                  <div className="pedido">
                    <h5 className="text-center titlePedido rounded-2">
                      <i>{pedido.nombre}</i>
                    </h5>
                    <p className="p-0 m-0">
                      <i>Pizzas</i>
                    </p>
                    <p className="p-0 m-0">
                      <i>Bebidas</i>
                    </p>
                    <i className="d-block">
                      Direccion:{pedido.direccion_entrega}
                    </i>
                    <i className="d-block">telefono:{pedido.telefono}</i>
                    <button 
                      className="btnDone"
                      onClick={() => confirmarEntrega(pedido.id)}
                      >
                      <span className="material-symbols-outlined">done</span>
                    </button>
                    <button
                      className="btnCancel"
                      onClick={() => cancelarPedido(pedido.id)}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ordenes;
