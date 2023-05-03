import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux' 

import itemReducer from './features/item'
import liveTextReducer from './features/live-text'
import editModeReducer from './features/editState'
import previewEditReducer from './features/previewEdit';
import resetForm from './features/resetForm';
import setActiveLiveTextReducer  from './features/activeLiveText';
import setControlPanelVisReducer from './features/cpanelVis'
import setInputStyle  from './features/inputStyle';
import setLoggedIn  from './features/loggedIn';
import cPanelInputStyle from './features/cPanelInputStyle';
const store = configureStore({
  reducer:{
    items: itemReducer,
    livetext: liveTextReducer,
    edit: editModeReducer,
    preview: previewEditReducer,
    reset: resetForm,
    active:setActiveLiveTextReducer,
    cPanelVis:setControlPanelVisReducer,
    inputStyle: setInputStyle,
    loggedIn:setLoggedIn,
    cPanelStyle:cPanelInputStyle
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
