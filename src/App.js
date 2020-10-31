import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store';
import MainComponent from './components/MainComponent';
import 'toasted-notes/src/styles.css';

function App() {
  return (
      <Provider store = { store }>
        <div>
          <MainComponent/>
        </div>
      </Provider>
  );
}

export default App;
