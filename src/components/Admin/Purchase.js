
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
                  <th>Rif</th>
                  <th>Description</th>
                  <th>Monto a Pagar</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coca-cola</td>
                  <td>Bebidas</td>
                  <td>11ltrs</td>
                  <td>250$</td>
                  <td>2/5/2010</td>
                </tr>
              </tbody>
            </table>
          
        </div>
      </div>
    </div>
  );
}

export default Purchase;
