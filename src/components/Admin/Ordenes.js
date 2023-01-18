function Ordenes({ title }) {
  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-sm-4 text-center text-white">
          <div className="card-orden">
            <h5 className="bg-primary">{"Cliente"}</h5>
            <ul>
                <li>pizzas y bebidas</li>
            </ul>
            <button className="boton">Entregada</button>
          </div>
        </div>
        <div className="col-sm-4 text-center text-white">
          <div className="card-orden">
            <h5 className="bg-primary">{"Cliente"}</h5>
            <ul>
                <li>pizzas y bebidas</li>
            </ul>
            <button className="boton">Entregada</button>
          </div>
        </div>
        <div className="col-sm-4 text-center text-white">
          <div className="card-orden">
            <h5 className="bg-primary">{"Cliente"}</h5>
            <ul>
                <li>pizzas y bebidas</li>
            </ul>
            <button className="boton">Entregada</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ordenes;
