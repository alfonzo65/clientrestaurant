import { useEffect, useState } from "react";

function NewInvoice({ title }) {
  const [choice, setChoice] = useState("");
  const [cedula, setCedula] = useState(null);

  useEffect(() => {}, [choice]);

  function HandlerChoice(e) {
    setChoice(e.target.value);
  }

  function ManejadorCedula(e) {
    setCedula(e.target.value);
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <select
          className="form-select bg-dark text-white mb-2"
          onChange={HandlerChoice}
        >
          <option value={""}>Selecciona el tipo de Factura</option>
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>
        <h2 className="subtitle p-2 text-white rounded-2">
          {title + " " + (choice == "" ? "" : choice)}
        </h2>
        <div className="col-md-12 text-white px-4 text-center">
          <form className="text-center">
            {choice == "Venta" && (
              <>
                <div className="input-group my-2 text-center">
                  <input
                    type="text"
                    pattern="(V)-[0-9]+"
                    className="form-control bg-dark text-white"
                    placeholder="Cedula ej: V-12345678"
                    onChange={ManejadorCedula}
                    value={cedula ? cedula : ""}
                  />
                </div>
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
                    type="tel"
                    pattern="[0-9]{11}"
                    className="form-control bg-dark text-white"
                    placeholder="Tlf: eje 04121234567"
                  />
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    className="form-control bg-dark text-white"
                    placeholder="Monto a Pagar $"
                  />
                </div>
              </>
            )}

            {choice == "Compra" && (
              <>
                <div className="input-group my-2 text-center">
                  <input
                    type="text"
                    pattern="(J)-[0-9]+"
                    className="form-control bg-dark text-white"
                    placeholder="Rif ej: J-12345678"
                    onChange={ManejadorCedula}
                    value={cedula ? cedula : ""}
                  />
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    placeholder="Nombre De La Empresa"
                  />
                </div>
                <div className="input-group my-2 text-center">
                  <input
                    type="tel"
                    pattern="[0-9]{11}"
                    className="form-control bg-dark text-white"
                    placeholder="Tlf: eje 04121234567"
                  />
                </div>
              </>
            )}
            {choice != "" && (
              <>
                <div className="input-group my-2 text-center"></div>
                <div className="input-group my-2 text-center">
                  <textarea
                    placeholder={"Description de la " + choice}
                    className="form-control bg-dark text-white"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewInvoice;
