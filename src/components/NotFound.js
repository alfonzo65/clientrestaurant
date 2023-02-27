import "../style/notfound.css"
import { Link } from "react-router-dom";


function NotFound() {

	return(
		<div className="container-fluid contenedor">
			<div className="notfoundcard">
				<h1>404</h1>
				<p>Ups... no pudimos encontrar la ruta</p>
				<button><Link className="link_notfound" to="/">Volver a Inicio</Link></button>
			</div>
		</div>
	);
}

export default NotFound;