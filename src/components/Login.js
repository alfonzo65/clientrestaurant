import "bootstrap/dist/css/bootstrap.min.css";
import "../style/login.css"
import logo from '../img/pizza-6682514_640.png'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Login() {
  const [ user, setUser ] = useState("")
  const [clave, setClave] = useState("");

  let navigate = useNavigate();

  useEffect(()=>{
    isAutenticate()
  }, [])

  function isAutenticate(){
    if( sessionStorage.getItem("rol") && sessionStorage.getItem("token") )
      navigate( sessionStorage.getItem("rol") )
  }

  function handlerUser(e) {
    setUser(e.target.value);
  }

  function handlerPassword(e) {
    setClave(e.target.value);
  }

  // peticion al rest-api
  async function handlerSubmit(e) {
    e.preventDefault();

    const data = JSON.stringify({
      email: user,
      contrasena: clave,
    });

    const resp = await fetch(
      "https://luzpizstore.onrender.com/api/users/login",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );

    const { success, results, token } = await resp.json();

    if (success) {
      sessionStorage.setItem("token", token );
      sessionStorage.setItem("rol", results.rol)
      navigate(results.rol + "/*", { replace: true });
    }else{
      await swal("Email o Contraseña Invalido", "", "warning")
      setClave("")
      setUser("")
    }
  }

  return (
    <div className="container-fluid bg-pizza">
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div
          className="login text-center position-relative"
        >
          <img src={logo} className="logo-login" alt="Imagen de Pizza de sym en Pixabay"></img>
          <form className="text-center mt-4" onSubmit={handlerSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className="text-center field"
                placeholder="example@mail.com"
                onChange={handlerUser}
                value={ user ? user : ""}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="text-center field"
                id="exampleInputPassword1"
                placeholder="password"
                onChange={handlerPassword}
                value={ clave ? clave : ""}
              />
              <div id="emailHelp" className="form-text text-white p-0 m-0"><Link 
              className="forgotten"
              to="forgottenPassword"
              >¿olvido su contrasenia?</Link></div>
            </div>
            <input type="submit" className="boton_ingresar" value="Ingresar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
