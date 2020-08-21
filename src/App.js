import React ,  { useState,useEffect} from "react";
import { BrowserRouter, Switch, Route , Redirect } from 'react-router-dom';
import "./App.css";
import Sidebar from "./components/Sidebar";
import MainContainer from "./components/MainContainer";
import MainHeader from "./components/MainHeader";
import Login from "./components/Login";
import {auth} from "./firebase/firebaseConfig"

function App() {
  const [sideBarToggle, setsideBarToggle] = useState(true);
  const [authorized, setauthorized] = useState(false);
  const [user, setuser] = useState({email:"",name:""});
  
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        const name= user.email.split(".")[0]
        setuser({email:user.email , name});
        setauthorized(true);
      }
      else{
        setuser({email:"" , name: ""});
        setauthorized(false);
      }
    })
    
  }, [authorized])

  const handleLogin =(e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
    .then(e=>console.log)
    .catch(e=>console.log)
  }
  
  const handleSignOut =()=>{
    auth.signOut()
  }

  return (
    <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
         <MainHeader 
         handleToggle={()=> setsideBarToggle(!sideBarToggle) }
         handleSignOut={handleSignOut}
         auth={authorized}
         user={user}
         />
      </div> 
      <div className={sideBarToggle ? "main" : "main full"} >
        <Sidebar sideBarToggle={sideBarToggle} />
          <Switch>
            <Route exact path="/" render={()=> authorized ? <MainContainer /> : <Redirect to="/login" /> } />
            <Route exact path="/login" render={()=> <Login handleLogin={handleLogin} />} />
          </Switch> 

      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
