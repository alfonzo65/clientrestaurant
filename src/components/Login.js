import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

function Login() {

  const { setUserName , setUserRol , user , rol } = useContext(UserContext);

  let navigate = useNavigate();

  function handlerUser(e){
    setUserName(e.target.value)
    setUserRol("admin")
  }

  // peticion al rest-api 
  function handlerSubmit(e){
    e.preventDefault()
    console.log( user + " " + rol )
    navigate(rol, { replace: true })
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
                id="exampleInputEmail1"
                placeholder="username"
                onChange={handlerUser}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control text-center"
                id="exampleInputPassword1"
                placeholder="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
