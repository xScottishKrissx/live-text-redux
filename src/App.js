import { useSelector, useDispatch } from 'react-redux'

import LoggedIn from './components/loggedIn';
import LoggedOut from './components/loggedOut';

import './App.css';
import "../src/components/Utility/Buttons/buttons.css"

function App() {
  const loggedInState = useSelector((state) => state.loggedIn.value)
  return (
    <div className="App">

      <div className="main-wrapper">
      {loggedInState === true ? <LoggedIn /> : <LoggedOut /> }
      
      


      </div>
    </div>
  );
}

export default App;
