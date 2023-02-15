import { useState } from "react";

function OlvidoDeClave() {

 const [mail, setMail] = useState("")

 function handlerEmail(e) {
    setMail(e.target.value)
 }

 async function recuperarContrasena(e){
    e.preventDefault()
    console.log(mail)
    const data = await JSON.stringify({email: mail})
    console.log(data)
    const res = await fetch('https://luzpizstore.onrender.com/api/users/temporal_password',{
        method:"POST",
        mode:"cors",
        headers:{
            "content-type":"application/json"
        },
        body: data
    })
    console.log(res)
    const respuesta = await res.json()
    console.log(respuesta)
  }


  return (
    <div className="container-fluid bg-pizza">
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <form className="login" onSubmit={recuperarContrasena}>
            <h3 className="text-white text-center">Recuperación de Contraseña</h3>
          <div className="p-2">
            <label className="text-white text-center m-auto d-block"><br/>
              <input type="email" 
              className="form-control-sm p-1 field d-block m-auto" 
              name="email"
              required 
              placeholder="Ingrese su email"
              onChange={handlerEmail}
              />
            </label><br/>
            <input type="submit" className="btn p-0 btn-primary m-auto d-block boton_ingresar m-auto" value="Enviar"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OlvidoDeClave;
