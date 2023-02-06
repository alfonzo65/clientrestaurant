import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

function Login() {
  const { setUserName, setUserRol, setUserToken, user, rol } =
    useContext(UserContext);
  const [clave, setClave] = useState("");

  let navigate = useNavigate();

  function handlerUser(e) {
    setUserName(e.target.value);
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
      await setUserRol(results.rol);
      await setUserToken(token);
      navigate(results.rol + "/*", { replace: true });
    }else{
      console.log("email or password invalid")
    }
  }

  return (
    <div className="container">
      <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div
          className="border p-3 shadow"
          style={{ width: "350px", height: "250px" }}
        >
          <h2 className="text-center">Login</h2>
          <form className="text-center mt-4" onSubmit={handlerSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control text-center"
                placeholder="example@mail.com"
                onChange={handlerUser}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control text-center"
                id="exampleInputPassword1"
                placeholder="password"
                onChange={handlerPassword}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Ingresar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
