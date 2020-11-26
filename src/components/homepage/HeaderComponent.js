import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Collapse } from '@material-ui/core'
import LoginComponent from '../auths/LoginComponent'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
    fontSize : "2.5rem",
    padding : '0.7rem'
  },
  colorText: {
    color: '#3349ec'
  },
  greenText:{
    color : '#05a531'
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '2.0rem',
    '@media (min-width:600px)': {
      fontSize: '2.3rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '3.2rem',
    },
  },
  goDown: {
    color: 'white',
    fontSize: '1.8rem',
  },
}));
export default function Header({ setLoggedIn }) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            Truck<span className={classes.colorText}>Desk</span>
          </h1>
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
          <span className = { classes.colorText }>D</span>igitalize, <span className = { classes.colorText }>V</span>isualize & <br />
            <span className = { classes.colorText }>D</span>ownload <span className = { classes.greenText } >data</span>
          </h1>

          {/* Here comes google login button */}
          <code style = {{ color : "white" }}> Only for Authorized user </code>
          <div style = {{ padding : "5em", display : 'flex', justifyContent : 'center', alignItems : 'center' }} >
            <LoginComponent setloggedIn = { setLoggedIn } />
          </div>
          
          <blockquote>
            <span style = {{ color : "white" }}> <b> Developed by  </b> </span><span style = {{ color : 'gray' }} >  Mini_Pro_Players </span>
          </blockquote> 
        </div>
      </Collapse>
    </div>
  );
}
