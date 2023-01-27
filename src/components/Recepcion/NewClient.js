function NewClient({ title }) {
  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12 text-white px-4 text-center">
          <form className="text-center">
            <div className="input-group my-2 text-center">
              <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="Nombre"
              />
              <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="Apellido"
              />
            </div>
            <div className="input-group my-2 text-center">
              <input
                type="text"
                pattern="(V)-[0-9]+"
                className="form-control bg-dark text-white"
                placeholder="Cedula ej: V-12345678"
              />
              <input
                type="tel"
                pattern="[0-9]{11}"
                className="form-control bg-dark text-white"
                placeholder="Tlf: eje 04121234567"
              />
            </div>
            <div className="input-group my-2 text-center">
              <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="Sector donde vive"
              />
            </div>
            <button className="btn btn-primary">Registrar CLiente</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewClient;
