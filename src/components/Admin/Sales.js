function Sales({title}) {
  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-12 text-white">
          <div className="encabezado">
            <ul className="encabezado_ul">
              <li>Ventas Realizadas: {"Count"}</li>
              <li>Monto total: ${"Amount"}</li>
            </ul>
          </div>

          <h2 className="text-center mt-1">Resumen de Ventas</h2>
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Cliente</th>
                <th>C.I</th>
                <th>Dirección</th>
                <th>Opcion del Menu</th>
                <th>Monto a Pagar</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jhon</td>
                <td>5558941</td>
                <td>El mojan, av3 calle 51</td>
                <td>2</td>
                <td>{210}$</td>
                <td>
                  <button className="btn btn-primary text-white py-1 px-2">
                    Ver
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales
