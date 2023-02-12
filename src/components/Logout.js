import { useEffect } from "react";
import { Link } from "react-router-dom";

function Logout() {

  useEffect(() => {}, []);

  sessionStorage.clear();

  return (
    <div className="flex-container">
      <div className="flex-item">
        <h2 className="p-4 title">Session Finalizada</h2>
        <Link className="link" to="/">Volver a Inicio</Link>
      </div>
    </div>
  );
}

export default Logout;
