function Facturas({ title }) {
  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12">
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>C.I</th>
                <th>Sector</th>
                <th>descripcion</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Tipo de Factura</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ryan Reinor</td>
                <td>V-5558941</td>
                <td>El mojan</td>
                <td>pizzas y bebidas</td>
                <td>{210}$</td>
                <td>10-20-2010</td>
                <td>Compra o Venta</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Facturas;
