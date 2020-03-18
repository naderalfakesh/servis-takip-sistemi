import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    },
    space:{
        marginTop: "15px"
    }
  });

export default function Login(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
           <h2>Login</h2>
           <form className={classes.root} onSubmit={props.handleLogin}> 
           <TextField 
           label="Email"
           name="email"
           variant="outlined" 
           type="email"
           autoComplete="email"
           />
           <TextField 
           label="Şifre"
           name="password"
           className={classes.space}
           variant="outlined"
           type="password"
           autoComplete="current-password"
           />
           <Button 
           className={classes.space}
           variant="contained" 
           color="primary"
           type="submit"
           
           >
            Giriş yap
            </Button>
            </form>
        </div>
    )
}
