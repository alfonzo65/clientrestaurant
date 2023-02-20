import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function NewInvoice({ title }) {
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [sinfacturar, setSinFacturar] = useState(false);
  const [tipo, setTipo] = useState("");
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
    id: "",
  });

  const requestOptions = {
    method: "",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  useEffect(() => {
    cargarOrdenes();
    cargarPedidos();
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
      id: "",
    });
  }, [choice]);

  function facturasPorCobrar(lista) {
    if (sinfacturar) return;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].facturado === 0) {
        setSinFacturar(true);
        return;
      }
    }
  }

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
          ...requestOptions,
          method: "POST",
          body: data,
        }
      );
      const { success, message } = await res.json();

      if (success) {
        await swal(message);
      } else {
        swal(message, "click in button ok please", "warning");
        navigate("/" + sessionStorage.getItem("rol") + "/providers");
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
          ...requestOptions,
          method: "POST",
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) {
        await swal(message);
      } else {
        await swal(message, "click in button ok please", "warning");
        navigate("/" + sessionStorage.getItem("rol") + "/customers");
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
          ...requestOptions,
          method: "POST",
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) {
        await swal(message, "", "success");
        navigate("/" + sessionStorage.getItem("rol") + "/facturas");
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
          ...requestOptions,
          method: "POST",
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) {
        await swal(message, "", "success");
        navigate("/" + sessionStorage.getItem("rol") + "/facturas");
      } else {
        swal("Erro interno al registrar factura de Venta");
      }
    }

    if (factura.id) {
      const data = await JSON.stringify({ id: factura.id });
      const tipoDeEncargo = tipo === "Orden" ? "ordenes" : "entregas";
      const res = await fetch(
        "https://luzpizstore.onrender.com/api/work/" +
          tipoDeEncargo +
          "/facturar",
        {
          ...requestOptions,
          method: "POST",
          body: data,
        }
      );
      const { success, message } = await res.json();
      if (success) await swal(message, "", "success");
    }

    cargarOrdenes();
    cargarPedidos();
  }

  async function cargarOrdenes() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/work/ordenes",
      { ...requestOptions, method: "GET" }
    );
    const { success, data } = await datos.json();
    if (success) setOrdenes(data);

    if (data.length > 0) facturasPorCobrar(ordenes);
  }

  async function cargarPedidos() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/work/entregas",
      {
        ...requestOptions,
        method: "GET",
      }
    );
    const { success, data } = await datos.json();
    if (success) setPedidos(data);

    if (data.length > 0) facturasPorCobrar(pedidos);
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
        ...requestOptions,
        method: "GET",
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
        ...requestOptions,
        method: "GET",
      }
    );
    const { success } = await res.json();
    if (!success) {
      setActivarForm(true);
    } else {
      setActivarForm(true);
      setVerificado(true);
    }

    document.getElementById("documento").disabled = true;
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
      id: "",
    });
    navigate("/" + sessionStorage.getItem("rol") + "/facturas", {
      replace: true,
    });
  }

  return (
    <div className="container mt-2 rounded-1">
      <div className="row m-auto">
        <select
          className="form-select bg-dark text-white my-2"
          onChange={HandlerChoice}
        >
          <option value={""}>Selecciona el tipo de Factura</option>
          <option value="Compra">Compra</option>
          <option value="Venta">Venta</option>
        </select>
        <h2 className="subtitle p-2 text-white rounded-2">
          {title + " " + (choice === "" ? "" : choice)}
        </h2>

        <div className="col-md-12 text-white text-center">
          {choice === "Venta" && sinfacturar && (
            <div className="p-2">
              <div className="alert alert-success p-1" role="alert">
                filas amarillas son Ordenes | filas azules son Pedidos
              </div>
              <h4>Facturas por cobrar</h4>
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Cedula</th>
                    <th>Monto</th>
                    <th>Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.map((orden) => {
                    if (!orden.facturado) {
                      return (
                        <tr
                          key={orden.id}
                          id="ordenes"
                          className="table-warning"
                        >
                          <td>{orden.nombre}</td>
                          <td>{orden.cliente_cedula}</td>
                          <td>{orden.total}$</td>
                          <td>
                            <button
                              className="btn_radio"
                              onClick={() => {
                                const cantPizzas = orden.pizzas.split(",");
                                const cantBebidas = orden.bebidas.split(",");
                                let cadena1 = "";
                                let cadena2 = "";
                                if (cantPizzas.length > 1) {
                                  cadena1 =
                                    "Pizzas: " + (cantPizzas.length - 1);
                                }
                                if (cantBebidas.length > 1) {
                                  cadena2 =
                                    "Bebidas: " + (cantBebidas.length - 1);
                                }
                                setActivarForm(true);
                                setVerificado(true);
                                setFactura({
                                  ...factura,
                                  documento: orden.cliente_cedula,
                                  total: orden.total,
                                  nombre: orden.nombre,
                                  descripcion:
                                    (cadena1 ? cadena1 : "") +
                                    " " +
                                    (cadena2 ? cadena2 : ""),
                                  id: orden.id,
                                });
                                document.getElementById(
                                  "documento"
                                ).disabled = true;
                                setTipo("Orden");
                              }}
                            >
                              <span className="material-symbols-outlined d-block icon">
                                check_circle
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    }

                    return <div key={orden.id}></div>;
                  })}

                  {pedidos.map((pedido) => {
                    if (!pedido.facturado) {
                      return (
                        <tr key={pedido.id} id="ordenes" className="table-info">
                          <td>{pedido.nombre}</td>
                          <td>{pedido.cliente_cedula}</td>
                          <td>{pedido.total}$</td>
                          <td>
                            <button
                              className="btn_radio"
                              onClick={() => {
                                const cantPizzas = pedido.pizzas.split(",");
                                const cantBebidas = pedido.bebidas.split(",");
                                let cadena1 = "";
                                let cadena2 = "";
                                if (cantPizzas.length > 1) {
                                  cadena1 =
                                    "Pizzas: " + (cantPizzas.length - 1);
                                }
                                if (cantBebidas.length > 1) {
                                  cadena2 =
                                    "Bebidas: " + (cantBebidas.length - 1);
                                }
                                setActivarForm(true);
                                setVerificado(true);
                                setFactura({
                                  ...factura,
                                  documento: pedido.cliente_cedula,
                                  total: pedido.total,
                                  nombre: pedido.nombre,
                                  descripcion:
                                    (cadena1 ? cadena1 : "") +
                                    " " +
                                    (cadena2 ? cadena2 : ""),
                                  id: pedido.id,
                                });
                                document.getElementById(
                                  "documento"
                                ).disabled = true;
                                setTipo("Pedido");
                              }}
                            >
                              <span className="material-symbols-outlined d-block icon">
                                check_circle
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    return <div key={pedido.id}></div>;
                  })}
                </tbody>
              </table>
            </div>
          )}
          <form className="text-center" onSubmit={registrarFactura}>
            {choice !== "" && !verificado && activarForm && (
              <div className="alert alert-info" role="alert">
                {choice === "Compra" ? "Proveedor" : "Cliente"} No Registrado,
                Por favor rellene los siguientes Campos para registrar nuevo{" "}
                {choice === "Compra" ? "Proveedor" : "Cliente"}
              </div>
            )}
            {choice !== "" && (
              <>
                {!verificado && activarForm && (
                  <h3>
                    Datos Del {choice === "Compra" ? "Proveedor" : "Cliente"}
                  </h3>
                )}
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
                    <>
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

                      <div className="input-group my-2 text-center">
                        <input
                          type="tel"
                          pattern="[0-9]{11}"
                          className="form-control bg-dark text-white"
                          placeholder="Tlf: eje 04121234567"
                          onChange={handlerFormChange}
                          name="telefono"
                          required
                        />
                        {!verificado && choice === "Venta" && (
                          
                            <input
                              placeholder="Sector Donde vive"
                              className="form-control bg-dark text-white"
                              name="direccion"
                              onChange={handlerFormChange}
                              required
                            />
                          
                        )}
                      </div>
                    </>
                  )}
                </div>

                {activarForm && (
                  <>
                    <h3>Datos para Facturar</h3>
                    <div className="input-group my-2 text-center">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        className="form-control bg-dark text-white"
                        placeholder="Monto a Pagar $"
                        onChange={handlerFormChange}
                        value={factura.total ? factura.total : ""}
                        name="total"
                        required
                      />
                    </div>
                    <div className="input-group my-2 text-center">
                      <textarea
                        placeholder={"Descripcion de la " + choice}
                        className="form-control bg-dark text-white"
                        name="descripcion"
                        onChange={handlerFormChange}
                        value={factura.descripcion ? factura.descripcion : ""}
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
