import { Link } from "react-router-dom";

function NavSettings() {
  return (
    <div className="navbar nav_bar d-block mt-2 barra_lateral">
      <div className="navbar_div">
        <Link className="nav-link" to="perfil">
          Mi Perfil
        </Link>
      </div>
      <div className="navbar_div">
        <Link className="nav-link" to="users">
          Usuarios
        </Link>
      </div>
      <div className="navbar_div">
        <Link className="nav-link" to="pizzas">
          Pizzas
        </Link>
      </div>
      <div className="navbar_div">
        <Link className="nav-link" to="bebidas">
          Bebidas
        </Link>
      </div>
    </div>
  );
}

export default NavSettings;
