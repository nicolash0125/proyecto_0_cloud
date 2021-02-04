import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function Register() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [creado, setCreado] = useState(false);
  
  const url='/registro'
  const handleSubmit = function () {
      let credenciales={'correo':correo,'contrasena':contrasena}
        axios
          .post(url,credenciales)
          .then((response) => {
            // Obtenemos los datos
            console.log(response)
            setCreado(true)
          })
          .catch((e) => {
            // Capturamos los errores
            console.log(e);
          });
  
  };
  return (
    <div className="p-5">
      <h1>Registrarse</h1>
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
      {creado?<div className="alert alert-success">
        Usuario registrado, puedes iniciar sesion
      </div>:<></>}
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Registrarse
      </button>
    </div>
  );
}
