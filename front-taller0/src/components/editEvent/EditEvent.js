import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../contextProvider/ContextProvider";

export default function DetailEvent() {
  const [data, setData] = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Conferencia");
  const [lugar, setLugar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [presencialidad, setPresencialidad] = useState(false);

  const [creado,setCreado]=useState(false)
  const url = "/eventos/"+data.idEvento;
  useEffect(()=> {
    
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
        setNombre(response.data.nombre)
        
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  })

  const editarEvento = function () {
    let evento = { nombre: nombre, categoria: categoria,lugar:lugar,direccion:direccion,presencialidad:presencialidad };
    console.log(evento)
    axios
      .put(url, evento)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
        setCreado(true)
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  };
  return (
    <div className="p-5">
      <h1>Editar evento {nombre}</h1>
      <form>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Categoria</label>
          <select
            class="form-control"
            id="exampleFormControlSelect1"
            onChange={(event) => {
              setCategoria(event.target.value);
            }}
          >
            <option>Conferencia</option>
            <option>Seminario</option>
            <option>Congreso</option>
            <option>Curso</option>
          </select>
        </div>
        <div className="form-group">
          <label> Lugar: </label>
          <input
            className="form-control"
            type="text"
            onChange={(event) => {
              setLugar(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label> Direccion: </label>
          <input
            className="form-control"
            type="text"
            onChange={(event) => {
              setDireccion(event.target.value);
            }}
          />
        </div>
        
        <div className="form-check">
          <label> Presencialidad: </label>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(event) => {
              setPresencialidad(event.target.checked);
            }}
          />
        </div>
      </form>
      {creado?<div className="alert alert-success">
        Evento editado, si deseas regrersar, oprime boton en la parte superior.
      </div>:<></>}
      <button type="button" className="btn btn-primary" onClick={editarEvento}>
        Editar evento
      </button>
    </div>
  );
}
