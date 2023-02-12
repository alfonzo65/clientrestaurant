import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext.js";

function Menu({ title }) {
  const { token } = useContext(UserContext);
  const [pizzas, setPizzas] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    setPizzas([])
    setBebidas([])
    cargarBebidas();
    cargarPizzas();
  }, []);

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  async function cargarPizzas() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/menu/pizzas",
      { ...requestOptions, method: "GET" }
    );
    const { data } = await datos.json();
    setPizzas(data);
  }

  async function cargarBebidas() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/menu/bebidas",
      { ...requestOptions, method: "GET" }
    );
    const { data } = await datos.json();
    setBebidas(data);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row fondoPizza rounded">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-sm-6 mt-2 menu1">
          <h3 className="text-center">Pizzas</h3>
          <table className="table text-white text-center">
            <thead>
              <tr>
                <th>
                  <h5>Pizza</h5>
                </th>
                <th>
                  <h5>Price</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {pizzas.map((pizza) => {
                return (
                  <tr key={pizza.id}>
                    <td>{pizza.nombre}</td>
                    <td>{pizza.precio}$</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-sm-6 mt-2 menu2">
          <h3 className="text-center">Bebidas</h3>
          <table className="table text-white text-center">
            <thead>
              <tr>
                <th>
                  <h5>Bebida</h5>
                </th>
                <th>
                  <h5>Price</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {bebidas.map((bebida) => {
                return (
                  <tr key={bebida.id}>
                    <td>{bebida.nombre}</td>
                    <td>{bebida.precio}$</td>
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

export default Menu;
