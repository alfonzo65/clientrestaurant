import { useEffect, useState } from "react";
import swal from "sweetalert";

function Ordenes({ title }) {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarOrdenes() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/work/ordenes",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await datos.json();
    if (success) setOrdenes(data);
    if (data.length === 0) swal("No hay Ordenes", "", "warning");
  }

  async function confirmarOrden(idOrden, facturado) {
    const data = await JSON.stringify({ id: idOrden });

    if (!facturado) {
      const respuesta = await swal({
        title: "Estas seguro de la entrega?",
        text: "Una vez confirmada la entrega no podras facturarlo",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (respuesta) {
        const res = await fetch(
          "https://luzpizstore.onrender.com/api/work/ordenes",
          { ...requestOptions, method: "DELETE", body: data }
        );
        const { success, message } = await res.json();
        if (success){
          await swal(message, "", "success");
          cargarOrdenes();
        } 
        else swal(message, "", "warning");
      } else {
        swal("Tu orden sige pendiente por Entregar!");
      }
    } else {
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/ordenes",
        { ...requestOptions, method: "DELETE", body: data }
      );
      const { success, message } = await res.json();
      if (success){
        await swal(message, "You clicked the button!", "success");
        cargarOrdenes();
      } 
      else
        swal(
          message,
          "Ocurrio Un error al intentar confirmar la orden",
          "warning"
        );
    }

  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12 text-white">
          <div className="text-center py-1 my-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                cargarOrdenes();
              }}
            >
              Actualizar Ordenes
            </button>
          </div>
          <div className="grid-container">
            {ordenes.map((orden) => {
              // convierte las pizzas y bebidas a un array donde cada posicion es un nombre
              let list1 = orden.pizzas.split(",");
              let list2 = orden.bebidas.split(",");
              list1.pop();
              list2.pop();
              return (
                <div key={orden.id} className="text-center grid-item">
                  <div className="orden">
                    <h5 className="text-center titleOrden rounded-2">
                      {orden.nombre}
                    </h5>
                    <p className="note">{orden.cliente_cedula}</p>
                    {list1.map((pizzaName) => (
                      <p key={list1.indexOf(pizzaName)} className="note">
                        <i>{pizzaName}</i>
                      </p>
                    ))}
                    {list2.map((bebidaName) => (
                      <p key={list2.indexOf(bebidaName)} className="note">
                        <i>{bebidaName}</i>
                      </p>
                    ))}
                    <p className={orden.facturado ? "bg-success" : "bg-danger"}>
                      {orden.facturado ? "Facturado" : "No-Facturado"}
                    </p>
                    <button
                      className="btnEntrega mt-1"
                      onClick={() => {
                        confirmarOrden(orden.id, orden.facturado);
                      }}
                    >
                      Entregada
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
