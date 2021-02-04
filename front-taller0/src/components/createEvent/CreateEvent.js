import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

export default function CreateEvent() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Conferencia");
  const [lugar, setLugar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [presencialidad, setPresencialidad] = useState(false);
  const [error,setError]=useState(false)
  const [creado,setCreado]=useState(false)
  
  const url = "/eventos";
  const crearEvento = function () {
    let evento = { nombre: nombre, categoria: categoria,lugar:lugar,direccion:direccion,fechaInicio:fechaInicio,fechaFin:fechaFin,presencialidad:presencialidad };
    console.log(evento)
    axios
      .post(url, evento)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
        setCreado(true)
        setError(false)
      })
      .catch((e) => {
        // Capturamos los errores
        setError(true)
        console.log(e);
      });
  };
  return (
    <div className="p-5">
      <h1>Crear evento</h1>
      <form>
        <div className="form-group">
          <label> Nombre: </label>
          <input
            className="form-control"
            type="text"
            value={nombre}
            onChange={(event) => {
              setNombre(event.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Categoria</label>
          <select class="form-control" id="exampleFormControlSelect1" onChange={(event) => {
              setCategoria(event.target.value);
            }}>
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
            value={lugar}
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
            value={direccion}
            onChange={(event) => {
              setDireccion(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label> Fecha Inicio (DD/MM/AAAA): </label>
          <input
            className="form-control"
            type="text"
            value={fechaInicio}
            onChange={(event) => {
              setFechaInicio(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label> Fecha fin (DD/MM/AAAA): </label>
          <input
            className="form-control"
            type="text"
            value={fechaFin}
            onChange={(event) => {
              setFechaFin(event.target.value);
            }}
          />
        </div>
        <div className="form-check">
          <label> Presencialidad: </label>
          <input
            className="form-check-input"
            type="checkbox"
            value={presencialidad}
            onChange={(event) => {
              setPresencialidad(event.target.checked);
            }}
          />
        </div>
      </form>
      {error?<div className="alert alert-danger">
        Revisar formato fechas.
      </div>:<></>}
      {creado?<div className="alert alert-success">
        Evento creado, si deseas puedes crear mas eventos o regrersar con el boton en la parte superior.
      </div>:<></>}
      <button type="button" className="btn btn-primary" onClick={crearEvento}>
        Crear evento
      </button>
    </div>
  );
}
