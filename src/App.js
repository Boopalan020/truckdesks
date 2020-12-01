import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import MainComponent from './components/MainComponent'
import 'toasted-notes/src/styles.css'
import HeaderComponent from './components/homepage/HeaderComponent'

import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '90vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition : 'right',
  },
}));

function App() {
  const classes = useStyles()
  const [loggedIn, setLoggedIn] = useState(false)

  return (
      <Provider store = { store }>
        <div>
          {
            loggedIn ?
            <MainComponent setloggedIn = { setLoggedIn } /> : 
            <div className={classes.root} >
              <CssBaseline />
              <HeaderComponent setLoggedIn = { setLoggedIn } />
            </div>
          }
        </div>
      </Provider>
  );
}

export default App;
