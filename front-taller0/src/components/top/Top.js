import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../contextProvider/ContextProvider";
import axios from "axios";

export default function Login() {
  const [data, setData] = useContext(AppContext);
  const url = "/logout";
  const logout = function () {
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
        setData({
            ...data,
            sesion:false
          });
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  };
  return (
    <div className="row justify-content-end m-4">
      <button type="button" className="btn btn-danger" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}
