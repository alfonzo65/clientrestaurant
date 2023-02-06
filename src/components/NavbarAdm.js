import { Link } from "react-router-dom";
import "../style/navigationAdmin.css";

function Navbar() {
  return (
    <nav className="container-fluid p-0 nav-bar text-center">
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
        <Link className="nav-link" to="#">
          <span className="material-symbols-outlined d-block">logout</span>
          Log out
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

{
  /*

  <div className="nav-bar">
      <ul className="nav flex-column text-center text-white">
        <li className="nav-item">
          <Link className="nav-link link-light d-block" to="/admin/dashboard">
            <span className="material-symbols-outlined d-block">dashboard</span>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to="/admin/compras">
            <span className="material-symbols-outlined d-block">
              shopping_cart
            </span>
            Purchase
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to="#">
            <span className="material-symbols-outlined d-block">
              attach_money
            </span>
            Sales
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to="#">
            <span className="material-symbols-outlined d-block">
              directions_bike
            </span>
            Delivery
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to="#">
            <span className="material-symbols-outlined d-block">send</span>
            Envios
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to="#">
            <span className="material-symbols-outlined d-block">settings</span>
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-light" to="#">
            <span className="material-symbols-outlined d-block">logout</span>
            Log out
          </Link>
        </li>
      </ul>
    </div>

*/
}
