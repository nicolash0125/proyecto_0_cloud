import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../contextProvider/ContextProvider";
import axios from "axios";

export default function Login() {
  const [data,setData]=useContext(AppContext)
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(false)
  const url='/login'
  const handleSubmit = function () {
      let credenciales={'correo':correo,'contrasena':contrasena}
        axios
          .post(url,credenciales)
          .then((response) => {
            // Obtenemos los datos
            console.log(response.status)
            setData({
                ...data,
                sesion:true
              });
          })
          .catch((e) => {
            // Capturamos los errores
            setError(true)
            console.log(e);
          });
  
  };
  return (
    <div className="p-5">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label> Correo: </label>
          <input
          className="form-control"
            type="text"
            value={correo}
            onChange={(event) => {
              setCorreo(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label> Contraseña: </label>
          <input
          className="form-control"
            type="password"
            value={contrasena}
            onChange={(event) => {
              setContrasena(event.target.value);
            }}
          />
        </div>
      </form>
      {error?<div className="alert alert-danger">
        Credenciales incorrectas.
      </div>:<></>}
      
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Iniciar sesión
      </button>
    </div>
  );
}
