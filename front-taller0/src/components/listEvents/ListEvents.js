import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../contextProvider/ContextProvider";
import DetailEvent from "../detailEvent/DetailEvent";
import CreateEvent from "../createEvent/CreateEvent";
import EditEvent from "../editEvent/EditEvent";
export default function ListEvents() {
  const [data, setData] = useContext(AppContext);
  const [eventos, setEventos] = useState([]);
  const [crear, setCrear] = useState(false);
  const [detail, setDetail] = useState(false);
  const [edit, setEdit] = useState(false);

  const url = "/eventos";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        console.log(response.data);
        if (response.data != { error: "inicie sesion" }) {
          setEventos(response.data);
        }
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  }, [url]);

  const reload = () => {
    axios
      .get(url)
      .then((response) => {
        // Obtenemos los datos
        console.log(response.data);
        if (response.data != { error: "inicie sesion" }) {
          setEventos(response.data);
        }
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  };
  const verDetalle = (id) => {
    setData({
      ...data,
      idEvento: id,
    });
    setDetail(true);
  };
  const editar = (id) => {
    setData({
      ...data,
      idEvento: id,
    });
    setEdit(true);
  };
  const eliminar = (id) => {
    console.log("a");
    axios
      .delete(url + "/" + id)
      .then((response) => {
        console.log(response.data);
        reload()
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
      });
  };
  return (
    <>
      {detail ? (
        <>
          <div className="row justify-content-end m-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                
                setDetail(false);
              }}
            >
              Regresar
            </button>
          </div>
          <DetailEvent />
        </>
      ) : crear ? (
        <>
          <div className="row justify-content-end m-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                  reload()
                setCrear(false);
              }}
            >
              Regresar
            </button>
          </div>
          <CreateEvent />
        </>
      ) : edit ? (
        <>
          <div className="row justify-content-end m-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEdit(false);
                reload()
              }}
            >
              Regresar
            </button>
          </div>
          <EditEvent />
        </>
      ) : (
        <div className="m-3">
          <div className="row justify-content-between m-2">
            <h1>Lista de eventos</h1>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                setCrear(true);
              }}
            >
              Crear evento
            </button>
          </div>
          <p>Haga click en el nombre de un evento para verlo en detalle</p>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoria</th>
                <th scope="col">Lugar</th>
                <th scope="col">Presencialidad</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((e) => (
                <tr>
                  <th>{e.id}</th>
                  <td>
                    <button 
                    type="button" className="btn btn-link"
                      onClick={() => {
                        verDetalle(e.id);
                      }}
                    >
                      {e.nombre}
                    </button>
                  </td>
                  <td>{e.categoria}</td>
                  <td>{e.lugar}</td>
                  <td>
                    {e.presencialidad ? (
                      <span className="badge badge-primary">Presencial</span>
                    ) : (
                      <span className="badge badge-secondary">Virtual</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning m-2"
                      onClick={() => {
                        editar(e.id);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => {
                        eliminar(e.id);
                      }}
                    >
                      Eliminar
                    </button>
                    
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
