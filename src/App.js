import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from "./views/sidebar";
import MainContainer from "./views/main";
import Header from "./views/header";
import Login from "./components/Login";
import { auth } from "./firebase/firebaseConfig"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  App: {
    maxHeight: "100vh",
    height: "100vh",
    overflow: "hidden"
  },
  Main:{
    display: "flex",
    height: "calc(100% - 64px)",
    alignItems: "stretch",
  }
});

function App() {
  const classes = useStyles();
  const [sideBarToggle, setsideBarToggle] = useState(true);
  const [authorized, setauthorized] = useState(false);
  const [user, setuser] = useState({ email: "", name: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.email.split(".")[0]
        setuser({ email: user.email, name });
        setauthorized(true);
      }
      else {
        setuser({ email: "", name: "" });
        setauthorized(false);
      }
    })

  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    auth.signInWithEmailAndPassword(e.target.email.value, e.target.password.value)
      .then(data => setLoading(false))
      .catch(err => { setLoading(false); console.log(err) })
  }

  const handleSignOut = () => {
    setLoading(true);

    auth.signOut()
      .then(data => setLoading(false))
      .catch(err => { setLoading(false); console.log(err) })
  }

  return (
    <div className={classes.App} >
      <Header
        handleToggle={() => setsideBarToggle(!sideBarToggle)}
        handleSignOut={handleSignOut}
        auth={authorized}
        user={user}
      />
      <div className={classes.Main} >

        <Sidebar sideBarToggle={sideBarToggle} />
        {
          loading ? <CircularProgress /> :
            (<Switch>
              <Route exact path="/" render={() => authorized ? <MainContainer /> : <Redirect to="/login" />} />
              <Route exact path="/login" render={() => authorized ? <Redirect to="/" /> : <Login handleLogin={handleLogin} />} />
            </Switch>)
        }

      </div>
    </div>
  );
}

export default App;
