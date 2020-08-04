import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store';
import MainComponent from './components/MainComponent';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <ToastProvider>
      <Provider store = { store }>
        <div>
          <MainComponent/>
        </div>
      </Provider>
    </ToastProvider>
  );
}

export default App;
