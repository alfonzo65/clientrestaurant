import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";

function NewInvoice({ title }) {
  const navigate = useNavigate();
  const { token, rol } = useContext(UserContext);
  const [choice, setChoice] = useState("");
  const [verificado, setVerificado] = useState(false);
  const [activarForm, setActivarForm] = useState(false);
  const [factura, setFactura] = useState({
    documento: "",
    total: 0.0,
    descripcion: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {}, []);

  function HandlerChoice(e) {
    setChoice(e.target.value);
  }

  function handlerFormChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFactura({ ...factura, [name]: value });
  }

  async function registrarFactura(e) {
    e.preventDefault();

    if (!verificado && choice === "Compra") {
      // registra un nuevo proveedor
      const data = await JSON.stringify({
        rif: factura.documento,
        nombre: factura.nombre,
        numero: factura.telefono,
      });
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/provedores",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: data,
        }
      );
      const { success, message } = await res.json();

      if (success) {
        console.log(message);
      } else {
        swal(message, "click in button ok please", "warning");
        navigate("/" + rol + "/providers");
      }
    }

    if (!verificado && choice === "Venta") {
      // registrar un cliente
      const data = await JSON.stringify({
        cedula: factura.documento,
        nombre: factura.nombre,
        direccion: factura.direccion,
        numero: factura.telefono,
      });
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/clientes",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) {
        console.log(message);
      } else {
        swal(message, "click in button ok please", "warning");
        navigate("/" + rol + "/customers");
      }
    }

    if (choice === "Compra") {
      // registra una compra
      const data = await JSON.stringify({
        provedor_rif: factura.documento,
        total: factura.total,
        descripcion: factura.descripcion,
      });
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/compras",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) {
        swal(message)
        navigate("/" + rol + "/facturas");
      } else {
        swal("Erro interno al registrar factura de Compra");
      }
    }

    if (choice === "Venta") {
      // registra una Venta
      const data = await JSON.stringify({
        cliente_cedula: factura.documento,
        total: factura.total,
        descripcion: factura.descripcion,
      });
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/ventas",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) {
        swal(message)
        navigate("/" + rol + "/facturas");
      } else {
        swal("Erro interno al registrar factura de Venta");
      }
    }
  }

  function validarDocumento() {
    if (choice === "Compra") {
      if (factura.documento.length > 9) consultarProveedor();
      else swal("Verifique los datos ingresados");
    } else {
      if (factura.documento.length >= 8) consultarCliente();
      else swal("Verifique los datos ingresados");
    }
  }

  async function consultarProveedor() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/provedores/" +
        factura.documento,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success } = await res.json();

    if (!success) {
      setActivarForm(true);
      document.getElementById("documento").disabled = true;
    } else {
      document.getElementById("documento").disabled = true;
      setActivarForm(true);
      setVerificado(true);
    }
  }

  async function consultarCliente() {
    const res = await fetch(
      "https://luzpizstore.onrender.com/api/work/clientes/" + factura.documento,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { success } = await res.json();
    if (!success) {
      setActivarForm(true);
      document.getElementById("documento").disabled = true;
    } else {
      document.getElementById("documento").disabled = true;
      setActivarForm(true);
      setVerificado(true);
    }
  }

  function cancelarFactura() {
    setChoice("");
    setVerificado(false);
    setActivarForm(false);
    setFactura({
      documento: "",
      total: 0.0,
      descripcion: "",
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
    });
    navigate("/" + rol + "/facturas", { replace: true });
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
          <form className="text-center" onSubmit={registrarFactura}>
            {choice !== "" && (
              <>
                <div className="input-group my-2 text-center">
                  <input
                    type="text"
                    pattern={choice === "Compra" ? "(J|V)[0-9]+" : "(V)[0-9]+"}
                    className="form-control bg-dark text-white"
                    placeholder={
                      choice === "Compra"
                        ? "Rif ej: J - V...123456780"
                        : "Cedula ej: V12345678"
                    }
                    name="documento"
                    onChange={handlerFormChange}
                    value={factura.documento === "" ? "" : factura.documento}
                    id="documento"
                    required
                  />
                  {!verificado && activarForm && (
                    <input
                      type="text"
                      pattern={
                        choice === "Compra"
                          ? null
                          : "[A-Z]{1}[a-z]+ [A-Z]{1}[a-z]+"
                      }
                      className="form-control bg-dark text-white"
                      placeholder={
                        choice === "Compra"
                          ? "Nombre De Empresa"
                          : "Nombre Apellido"
                      }
                      name="nombre"
                      onChange={handlerFormChange}
                      required
                    />
                  )}
                </div>

                <div className="input-group my-2 text-center">
                  {!verificado && activarForm && (
                    <input
                      type="tel"
                      pattern="[0-9]{11}"
                      className="form-control bg-dark text-white"
                      placeholder="Tlf: eje 04121234567"
                      onChange={handlerFormChange}
                      name="telefono"
                      required
                    />
                  )}
                  {activarForm && (
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      className="form-control bg-dark text-white"
                      placeholder="Monto a Pagar $"
                      onChange={handlerFormChange}
                      name="total"
                      required
                    />
                  )}
                </div>

                {activarForm && (
                  <>
                    {!verificado && choice === "Venta" && (
                      <div className="input-group my-2 text-center">
                        <input
                          placeholder="Sector Donde vive"
                          className="form-control bg-dark text-white"
                          name="direccion"
                          onChange={handlerFormChange}
                          required
                        />
                      </div>
                    )}

                    <div className="input-group my-2 text-center">
                      <textarea
                        placeholder={"Description de la " + choice}
                        className="form-control bg-dark text-white"
                        name="descripcion"
                        onChange={handlerFormChange}
                        required
                      ></textarea>
                    </div>
                  </>
                )}

                {!activarForm && (
                  <div className="input-group my-2 text-center">
                    <input
                      type="button"
                      className="btn btn-primary"
                      value="Consultar"
                      onClick={validarDocumento}
                    />
                  </div>
                )}
                {activarForm && (
                  <>
                    <div className="input-group my-2 text-center">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={"Registrar " + choice}
                      />
                    </div>
                    <div className="input-group my-2 text-center">
                      <input
                        type="button"
                        className="btn btn-danger"
                        value="Cancelar"
                        onClick={cancelarFactura}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewInvoice;
