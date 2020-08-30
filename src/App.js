import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store';
import MainComponent from './components/MainComponent';
import { ToastProvider } from 'react-toast-notifications';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ToastProvider>
        <Provider store = { store }>
          <div>
            <MainComponent/>
          </div>
        </Provider>
      </ToastProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
