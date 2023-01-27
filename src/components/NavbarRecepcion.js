import { Link } from "react-router-dom";

function NavbarRecepcion() {
  return (
    <nav className="container-fluid p-0 nav-bar text-center">
      <div className="nav-div">
        <Link className="nav-link" to="menu">
          <span className="material-symbols-outlined d-block">menu_book</span>
          Menu
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="newOrden">
          <span className="material-symbols-outlined d-block">description</span>
          NewOrden
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="newClient">
          <span className="material-symbols-outlined d-block">person_add</span>
          NewClient
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="ordenes">
          <span className="material-symbols-outlined d-block">list_alt</span>
          Ordenes
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="pedidos">
          <span className="material-symbols-outlined d-block">local_shipping</span>
          Pedidos
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="#">
          <span className="material-symbols-outlined d-block">logout</span>
          Log out
        </Link>
      </div>
    </nav>
  );
}

export default NavbarRecepcion;
