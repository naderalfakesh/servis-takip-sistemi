import React from "react";
import { Link  } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = "100%";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: "100%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: "relative"
  },
  
}));


export default function Sidebar(props) {
    const classes = useStyles();
    return (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
          open={props.sideBarToggle}
        >
          <Divider />
          <List>
            {["Servis Listesi"].map((text, index) => (
              <ListItem button key={text} component={Link} to="/" >
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
    );
  }
