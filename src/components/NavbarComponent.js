import React, { useState } from "react";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// AppBar imports
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Material icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';   //profile
import DashboardIcon from '@material-ui/icons/Dashboard';           //Dashboard
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';       //Add driver
import LocalShippingIcon from '@material-ui/icons/LocalShipping';   //Add vehicle
import MemoryIcon from '@material-ui/icons/Memory';                 // memo Icon
import ExitToAppIcon from '@material-ui/icons/ExitToApp';           // Logout icon
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

function NavbarComponent(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ [anchor]: open });
  };

  console.log(props.navItems);

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {props.navItems.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 && ( <AccountCircleIcon /> )}
              {index === 1 && ( <DashboardIcon /> )}
              {index === 2 && ( <EmojiPeopleIcon /> )}
              {index === 3 && ( <LocalShippingIcon /> )}
              {index === 4 && ( <MemoryIcon /> )}
              {index === 5 && ( <ExitToAppIcon /> )}
            </ListItemIcon>
            {index === 0 && (
                <Link to='/profile' style={{textDecoration:'none', color:"black"}}>
                    <ListItemText primary={text} />
                </Link>
            )}
            {index === 1 && (
                <Link to='/dashboard' style={{textDecoration:'none', color:"black"}}>
                    <ListItemText primary={text} />
                </Link>
            )}
            {index === 2 && (
                <Link to='/viewdrivers' style={{textDecoration:'none', color:"black"}}>
                    <ListItemText primary={text} />
                </Link>
            )}
            {index === 3 && (
                <Link to='/viewvehicle' style={{textDecoration:'none', color:"black"}}>
                    <ListItemText primary={text} />
                </Link>
            )}
            {index === 4 && (
                <Link to='/memo' style={{textDecoration:'none', color:"black"}}>
                    <ListItemText primary={text} />
                </Link>
            )}
            {index === 5 && (
                <ListItemText primary={text} />
            )}
          </ListItem>
        ))}
        <Divider />
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer("left", true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>

          <Typography variant="h6" className={classes.title}>
            TruckDesk4U
          </Typography>
          <Button color="inherit" >Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    navItems: state.navbar.navItems,
    left : state.navbar.left
  };
};

export default connect(mapStateToProps)(NavbarComponent);
