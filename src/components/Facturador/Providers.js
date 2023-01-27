function Providers({ title }) {
    return (
      <div className="container mt-2 rounded-1">
        <div className="row">
          <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
          <div className="col-md-12">
            <table className="table text-white text-center">
              <thead className="table-dark">
                <tr>
                  <th>Proveedor</th>
                  <th>Rif</th>
                  <th>Telefono</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ryan Reinor</td>
                  <td>J-1234567</td>
                  <td>04126911568</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default Providers;