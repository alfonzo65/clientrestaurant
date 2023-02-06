import {useState, useEffect, useContext } from 'react'
import { UserContext } from "../../context/UserContext.js";
import swal from "sweetalert";


function Providers({ title }) {

  const { token } = useContext(UserContext);
  const [ proveedores, setProveedores ] = useState([])

  useEffect(()=>{
    cargarProveedores()
  },[])


  async function cargarProveedores() {
    const res = await fetch('https://luzpizstore.onrender.com/api/work/provedores',{
      method:"GET",
      mode:"cors",
      headers:{
        "content-type":"application/json",
        Authorization: "Bearer " + token
      }
    })
    const { success, data } = await res.json()
    if( success )
        setProveedores(data)
    else
      console.log("error interno")

    if( data.length === 0 )
      swal("No hay Proveedores Registrados" )
  }


  return (
    <div className="container mt-2 rounded-1">
      <div className="row">
        <h2 className="subtitle p-2 text-white rounded-2">{title}</h2>
        <div className="col-md-12">
          <table className="table text-white text-center">
            <thead className="table-dark">
              <tr>
                <th>Proveedor</th>
                <th>Rif</th>
                <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              {
                proveedores.map((proveedor)=>{
                  return(
                    <tr key={proveedor.rif}>
                      <td>{proveedor.nombre}</td>
                      <td>{proveedor.rif}</td>
                      <td>{proveedor.numero}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Providers;
