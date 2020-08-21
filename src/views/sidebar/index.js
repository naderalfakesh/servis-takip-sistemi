import React from "react";
import { Link  } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = "100%";




export default function Sidebar({sideBarToggle}) {
  const useStyles = makeStyles(theme => ({
    drawer: {
      width: sideBarToggle ? "200px" : "0",
      height: "100%",
    },
    drawerPaper: {
      width: drawerWidth,
      position: "relative"
    },
    
  }));
    const classes = useStyles();
    return (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
          open={sideBarToggle}
        >
          <Divider />
          <List>
            {["Servis Listesi 1","Servis Listesi 2"].map((text, index) => (
              <ListItem button key={text} component={Link} to="/" >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
    );
  }
