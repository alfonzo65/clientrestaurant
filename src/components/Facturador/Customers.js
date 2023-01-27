function Customers({ title }) {
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
                  <th>Telefono</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ryan Reinor</td>
                  <td>V-5558941</td>
                  <td>El mojan</td>
                  <td>04126911857</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default Customers;