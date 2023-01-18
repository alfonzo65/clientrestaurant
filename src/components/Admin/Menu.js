

function Menu({ title }) {
  return (
    <div className="container mt-2 rounded-1">
      <div className="row fondoPizza rounded">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-sm-6 mt-2 menu1">
            <h3 className="text-center">Pizzas</h3>
            <table className="table text-white text-center">
              <thead>
                <tr>
                    <th>Pizza</th>
                    <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pizza napolitana</td>
                  <td>Precio</td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className="col-sm-6 mt-2 menu2">
        <h3 className="text-center">Bebidas</h3>
            <table className="table text-white text-center">
            <thead>
                <tr>
                    <th>Bebida</th>
                    <th>Price</th>
                </tr>
                </thead>
              <tbody>
                <tr>
                  <td>Coca-cola</td>
                  <td>Precio</td>
                </tr>  
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

export default Menu;
