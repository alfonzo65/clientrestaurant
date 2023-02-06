import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext.js";
import swal from "sweetalert";

function Bebidas({ title }) {
  const { token } = useContext(UserContext);
  const [misBebidas, setMisBebidas] = useState([]);
  const [newBebida, setNewBebida] = useState({
    nombre: "",
    precio: "",
    id: "",
  });

  useEffect(() => {
    cargarBebidas();
    document.getElementById("boton_edit").disabled = true;
    document.getElementById("boton_submit").disabled = false;
  }, []);

  function handlerFormChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNewBebida({ ...newBebida, [name]: value });
  }

  // crear nueva bebida
  async function createNewBebida(e){
    e.preventDefault()
    const data = await JSON.stringify({nombre:newBebida.nombre, precio:newBebida.precio})
    const res = await fetch('https://luzpizstore.onrender.com/api/menu/bebidas',{
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: data
    })
    const { success } = await res.json()
    if( success === 1 ){
      await swal( "Bebida Registrada Con Exito!", "You clicked the button!", "success" )
       setBebida({nombre:"",precio:"",id:""})
       cargarBebidas()
    }else{
      await swal( "Ocurrio un error al Intentar Registrar La Bebida!", "You clicked the button!", "warning" )
    }
  }

  // actualizar bebida
  async function updateBebida(){
    const data = await JSON.stringify({ nombre: newBebida.nombre, precio:newBebida.precio , id: newBebida.id})
    const res = await fetch('https://luzpizstore.onrender.com/api/menu/bebidas',{
      method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: data
    })
    const { success , message } = await res.json()
    if( success === 1 ){
      await swal( message ,"You clicked the button!", "success" )
      setBebida({nombre:"",precio:"",id:""})
      document.getElementById("boton_edit").disabled = true
      document.getElementById("boton_submit").disabled = false
      cargarBebidas()
    }else{
      await swal( message + ", error al intentar Actualizar la Bebida" ,"You clicked the button!", "warning" )
    }
  }

  // eliminar una bebida
  async function deleteBebida( bebida_id ){
    const data = await JSON.stringify({id:bebida_id})
    console.log(data)
    const res = await fetch('https://luzpizstore.onrender.com/api/menu/bebidas',{
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: data
    })
    const { success , message } = await res.json()
    if( success === 1 ){
      await swal( message ,"You clicked the button!", "success" )
      cargarBebidas()
    }else{
      await swal( message + ", error al intentar Eliminar la Bebida" ,"You clicked the button!", "warning" )
    }
  }

  
  // establece una bebida
  function setBebida( bebida ){
    setNewBebida( bebida );
  }

  async function cargarBebidas() {
    const datos = await fetch(
      "https://luzpizstore.onrender.com/api/menu/bebidas",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const { data } = await datos.json();
    setMisBebidas(data);
  }
  return (
    <div className="row users_table mt-2">
      <h2 className="text-center text-white p-2">{title}</h2>
      <div className="col-md-12">
        <table className="table table-sm text-white text-center">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {misBebidas.map((bebida) => {
              return (
                <tr key={bebida.id}>
                  <td>{bebida.nombre}</td>
                  <td>{bebida.precio}$</td>
                  <td>
                    <button className="boton_edit"
                      onClick={()=>{
                        setBebida(bebida)
                        document.getElementById("boton_submit").disabled = true;
                        document.getElementById("boton_edit").disabled = false;
                      }}
                    >
                      <span className="material-symbols-outlined">
                        settings
                      </span>
                    </button>
                    <button className="boton_delete"
                      onClick={()=>{ deleteBebida(bebida.id) }}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-md-12 text-white">
        <form onSubmit={createNewBebida}>
          <h2 className="text-center">Datos De La Bebida</h2>

          <div className="input-group my-2 text-center">
            <input
              type="text"
              className="form-control bg-dark text-white"
              placeholder="Nombre De La Bebida"
              name="nombre"
              value={( newBebida.nombre === "" ? "" : newBebida.nombre )}
              onChange={handlerFormChange}
            />
            <input
              type="number"
              min={0.1}
              max={1000.0}
              step={0.1}
              className="form-control bg-dark text-white"
              placeholder="Precio"
              name="precio"
              value={( newBebida.precio === "" ? "" : newBebida.precio )}
              onChange={handlerFormChange}
            />
          </div>
          <div className="input-group my-2 text-center">
            <input
              type="submit"
              id="boton_submit"
              className="btn btn-outline-success"
              value="Registrar Bebida"
            />
            <input
              type="button"
              className="btn btn-outline-primary"
              value="Actualizar Bebida"
              id="boton_edit"
              onClick={()=>{updateBebida()}}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Bebidas;
