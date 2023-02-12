import { Link } from "react-router-dom";
import "../style/navigationAdmin.css";

function Navbar() {
  return (
    <nav className="container-fluid p-0 nav-bar text-center barra">
      <div className="nav-div">
        <Link className="nav-link" to="dashboard">
          <span className="material-symbols-outlined d-block">dashboard</span>
          Dashboard
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="purchase">
          <span className="material-symbols-outlined d-block">
            shopping_cart
          </span>
          Purchase
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="sales">
          <span className="material-symbols-outlined d-block">
            attach_money
          </span>
          Sales
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="delivery">
          <span className="material-symbols-outlined d-block">
            directions_bike
          </span>
          Delivery
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="menu">
          <span className="material-symbols-outlined d-block">send</span>
          Menu
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="ordenes">
          <span className="material-symbols-outlined d-block">list_alt</span>
          Ordenes
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="settings/perfil">
          <span className="material-symbols-outlined d-block">settings</span>
          Settings
        </Link>
      </div>

      <div className="nav-div">
        <Link className="nav-link" to="../logout">
          <span className="material-symbols-outlined d-block">logout</span>
          Log out
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

