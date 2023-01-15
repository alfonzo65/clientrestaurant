import "../style/navigationAdmin.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.js";

function Header() {
  const { rol } = useContext(UserContext);

  return (
    <header className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-white p-2">
        <span className="material-symbols-outlined fs-1 rounded-4 bg-black p-1 float-start">
              monitoring
            </span>
          <h2 className="text-center">
            Welcome {rol}
          </h2>
        </div>
      </div>
    </header>
  );
}

export default Header;

