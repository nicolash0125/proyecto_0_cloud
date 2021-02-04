import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../contextProvider/ContextProvider";

export default function DetailEvent() {
  const [data, setData] = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lugar, setLugar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [presencialidad, setPresencialidad] = useState(false);
  const url = "/eventos/"+data.idEvento;
  useEffect(()=> {
    
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        console.log(response);
        setNombre(response.data.nombre)
        setCategoria(response.data.categoria)
        setLugar(response.data.lugar)
        setDireccion(response.data.direccion)
        setFechaInicio(response.data.fechaInicio)
        setFechaFin(response.data.fechaFin)
        setPresencialidad(response.data.presencialidad)
        
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  })
  return (
    <div className="p-5">
      <h1>Evento {nombre}</h1>
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
          <label> Fecha Inicio: </label>
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
          <label> Fecha fin: </label>
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

    </div>
  );
}
