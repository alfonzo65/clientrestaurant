import { Link } from "react-router-dom";

function NavbarRecepcion() {
  return (
    <nav className="container-fluid p-0 nav-bar text-center barra">
      <div className="nav_element">
        <Link className="nav-link" to="menu">
          <span className="material-symbols-outlined d-block">menu_book</span>
          Menu
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="newOrden">
          <span className="material-symbols-outlined d-block">description</span>
          Nueva Orden
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="newClient">
          <span className="material-symbols-outlined d-block">person_add</span>
          Nuevo Cliente
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="ordenes">
          <span className="material-symbols-outlined d-block">list_alt</span>
          Ordenes
        </Link>
      </div>

      <div className="nav_element">
        <Link className="nav-link" to="pedidos">
          <span className="material-symbols-outlined d-block">local_shipping</span>
          Pedidos
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

export default NavbarRecepcion;
