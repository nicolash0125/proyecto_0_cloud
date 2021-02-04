import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../contextProvider/ContextProvider";
import Login from "../login/Login"
import Register from "../register/Register"
import ListEvents from "../listEvents/ListEvents"
import Top from "../top/Top"
export default function Home() {
  const [data, setData] = useContext(AppContext);
  return <>{data.sesion ? <div>
      <Top/>
<ListEvents/>
  </div> : 
  <div className="row">
      <div className="col"><Login/></div>
      <div className="col"><Register/></div>
</div>}</>;
}
