import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import GlobalContext from './provider/contextGlobal'
import PrivateUser from './components/privates'

import "react-big-calendar/lib/css/react-big-calendar.css";


const App = (props) => {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <GlobalContext>
            <PrivateUser exact path='/main' component={Main} />
          </GlobalContext>
        </Switch>
      </BrowserRouter>

    </div >
  );
}

export default App;