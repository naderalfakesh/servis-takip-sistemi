import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default class Header extends Component {
  render() {
    return (
      <>
        <AppBar position="fixed" style={{ zIndex: 1300 }} elevation="0">
          <Toolbar>
            <IconButton
              edge="start"
              onClick={this.props.handleToggle}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              DalElektrik
            </Typography>
            {this.props.auth && (
              <Typography> {this.props.user.name} </Typography>
            )}
            {this.props.auth && (
              <Button color="inherit" onClick={this.props.handleSignOut}>
                Çıkış{" "}
              </Button>
            )}
            {!this.props.auth && <Button color="inherit">Aböne </Button>}
            {!this.props.auth && <Button color="inherit">Giriş </Button>}
          </Toolbar>
        </AppBar>
        <Toolbar />
      </>
    );
  }
}
