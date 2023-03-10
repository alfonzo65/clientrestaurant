import { Link } from "react-router-dom";
import "../style/navigationAdmin.css";

function NavbarFacturador() {

  return (
    <nav className="container-fluid p-0 nav-bar text-center">
      <div className="nav_element">
        <Link className="nav-link" to="facturas">
          <span className="material-symbols-outlined d-block">
            receipt_long
          </span>
          Facturas
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="createInvoice">
          <span className="material-symbols-outlined d-block">receipt</span>
          Nueva Factura
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="customers">
          <span className="material-symbols-outlined d-block">list</span>
          Clientes
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="providers">
          <span className="material-symbols-outlined d-block">list</span>
          Proveedores
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="../logout">
          <span className="material-symbols-outlined d-block">logout</span>
          Salir
        </Link>
      </div>
    </nav>
  );
}

export default NavbarFacturador;
