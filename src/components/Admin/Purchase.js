
function Purchase({ title }) {

















  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">

            <div className="encabezado">
              <ul className="encabezado_ul">
                <li>Compras Realizadas: {"Count"}</li>
                <li>Monto total: ${"Amount"}</li>
              </ul>
            </div>
            
            <h2 className="text-center mt-1">Resumen de Compras</h2>
            <table className="table text-white text-center">
              <thead className="table-dark">
                <tr>
                  <th>Proveedor</th>
                  <th>Categoria</th>
                  <th>Cantidad</th>
                  <th>Monto a Pagar</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coca-cola</td>
                  <td>Bebidas</td>
                  <td>11ltrs</td>
                  <td>250$</td>
                  <td>
                    <button className="btn btn-primary text-white py-1 px-2">Ver</button>
                  </td>
                </tr>
              </tbody>
            </table>
          
        </div>
      </div>
    </div>
  );
}

export default Purchase;
