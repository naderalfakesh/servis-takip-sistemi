import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class MainHeader extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed" style={{zIndex: 1300}}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={this.props.handleToggle}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{flexGrow: 1}}>
              DalElektrik
            </Typography>
            <Button color="inherit">Aböne</Button>
            <Button color="inherit">Giriş yap</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
