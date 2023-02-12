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
    if (success) 
      setOrdenes(data);
    if(data.length === 0 )
      swal( "No hay Ordenes", "" , "warning" )
    
  }

  async function confirmarOrden(idOrden) {
    const data = await JSON.stringify({ id: idOrden });
    // peticion a la api
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/ordenes",
      { ...requestOptions, method: "DELETE", body:data }
    );
    const { success, message } = await res.json();
    if (success) await swal(message, "You clicked the button!", "success");
    else
      await swal(
        message,
        "Ocurrio Un error al intentar confirmar la orden",
        "warning"
      );
      
    cargarOrdenes();
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12 text-white">
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
                    {list1.map((pizzaName) => (
                      <p
                        key={list1.indexOf(pizzaName)}
                        className="note"
                      >
                        <i>{pizzaName}</i>
                      </p>
                    ))}
                    {list2.map((bebidaName) => (
                      <p
                        key={list2.indexOf(bebidaName)}
                        className="note"
                      >
                        <i>{bebidaName}</i>
                      </p>
                    ))}
                    <button
                      className="btnEntrega mt-1"
                      onClick={() => {
                        confirmarOrden(orden.id);
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
