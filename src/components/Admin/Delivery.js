
function Delivery({ title }) {

















    return (
      <div className="container mt-2 rounded-1">
        <div className="row">
          <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
          <div className="col-12 text-white">
  
              <div className="encabezado">
                <ul className="encabezado_ul">
                  <li>Total Deliverys: {"Count"}</li>
                </ul>
              </div>
              
              <h2 className="text-center mt-1">Resumen de Envios</h2>
              <table className="table text-white text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Cliente</th>
                    <th>Cedula</th>
                    <th>Direccion</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Coca-cola</td>
                    <td>Bebidas</td>
                    <td>11ltrs</td>
                    <td>22/10/2010</td>
                  </tr>
                </tbody>
              </table>
            
          </div>
        </div>
      </div>
    );
  }
  
  export default Delivery;