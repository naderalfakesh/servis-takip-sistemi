import React ,  { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MainContainer from "./components/MainContainer";
import MainHeader from "./components/MainHeader";

function App() {
  const [sideBarToggle, setsideBarToggle] = useState(true);
  const [authorized, setauthorized] = useState(false)
  return (
    <div className="App">
       <div>
         <MainHeader handleToggle={()=> setsideBarToggle(!sideBarToggle) }/>
         </div> 
      <div className={sideBarToggle ? "main" : "main full"} >
        <Sidebar sideBarToggle={sideBarToggle} />
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
