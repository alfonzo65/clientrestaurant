import { useEffect, useState } from "react";
import swal from "sweetalert";

function Ordenes({ title }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarPedidos() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/work/entregas",
      {
        ...requestOptions,
        method: "GET",
      }
    );
    const { success, data } = await datos.json();
    if (success) setPedidos(data);

    if (data.length === 0) await swal("No hay Pedidos", "", "warning");
  }

  async function cancelarPedido(idPedido) {
    const data = await JSON.stringify({ id: idPedido });
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/entregas",
      {
        ...requestOptions,
        method: "DELETE",
        body: data,
      }
    );
    const { success, message } = await res.json();
    if (success) await swal(message, "You clicked the button!", "success");
    else await swal(message, "You clicked the button!", "warning");

    cargarPedidos();
  }

  async function confirmarEntrega(idPedido, facturado) {
    const data = await JSON.stringify({ id: idPedido });

    if (facturado) {
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/confirmar",
        {
          ...requestOptions,
          method: "POST",
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) await swal(message, "You clicked the button!", "success");
      else await swal(message, "You clicked the button!", "warning");

      cargarPedidos();
    }else{
      await swal("EL pedido no ha sido facturado!", "", "warning")
    }
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-sm-12 text-center text-white">
          <div className="text-center py-1 my-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                cargarPedidos();
              }}
            >
              Actualizar Pedidos
            </button>
          </div>
          <div className="grid-container">
            {pedidos.map((pedido) => {
              let list1 = pedido.pizzas.split(",");
              let list2 = pedido.bebidas.split(",");
              list1.pop();
              list2.pop();
              return (
                <div className="text-center grid-item" key={pedido.id}>
                  <div className="pedido">
                    <h5 className="text-center titlePedido rounded-2">
                      <i>{pedido.nombre}</i>
                    </h5>
                    <p className="note">{pedido.cliente_cedula}</p>
                    {list1.map((pizzaName) => {
                      return (
                        <p className="p-0 m-0" key={list1.indexOf(pizzaName)}>
                          <i>{pizzaName}</i>
                        </p>
                      );
                    })}
                    {list2.map((bebidaName) => {
                      return (
                        <p className="p-0 m-0" key={list2.indexOf(bebidaName)}>
                          <i>{bebidaName}</i>
                        </p>
                      );
                    })}
                    <i className="d-block">
                      Direccion:{pedido.direccion_entrega}
                    </i>
                    <i className="d-block">telefono:{pedido.telefono}</i>
                    <p
                      className={pedido.facturado ? "bg-success" : "bg-danger"}
                    >
                      {pedido.facturado ? "Facturado" : "No-Facturado"}
                    </p>
                    <button
                      className="btnDone"
                      onClick={() =>
                        confirmarEntrega(pedido.id, pedido.facturado)
                      }
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
