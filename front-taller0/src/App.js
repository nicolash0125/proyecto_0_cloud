import logo from "./logo.svg";
import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Top from "./components/top/Top"
import ListEvents from "./components/listEvents/ListEvents"
import CreateEvent from "./components/createEvent/CreateEvent"
import EditEvent from "./components/editEvent/EditEvent"
import {ContextProvider} from "./components/contextProvider/ContextProvider"
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home"


function App() {
  return (
    <>
    <ContextProvider>
      <Home/>
      </ContextProvider>
    </>
  );
}

export default App;
