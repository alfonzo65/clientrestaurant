function Ordenes({ title }) {
  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-sm-12 text-center text-white">
          <table className="table text-white text-center">
            <thead className="table table-dark">
              <tr>
                <th>Cliente</th>
                <th >Telefono</th>
                <th>Direccion</th>
                <th >Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Roberto Gomez</td>
                <td>#333-5555</td>
                <td>Av8 calle t sector el mojan</td>
                <td><button className="btn btn-success">Confirmada</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ordenes;
