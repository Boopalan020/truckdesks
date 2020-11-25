import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import MainComponent from './components/MainComponent'
import 'toasted-notes/src/styles.css'
import LoginComponent from './components/auths/LoginComponent'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
      <Provider store = { store }>
        <div>
          {
            loggedIn 
            ? <MainComponent setloggedIn = { setLoggedIn } /> 
            : (
              <LoginComponent setloggedIn = { setLoggedIn } />
            )
          }
        </div>
      </Provider>
  );
}

export default App;
