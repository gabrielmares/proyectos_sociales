import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import GlobalContext from './provider/contextGlobal'

import "react-big-calendar/lib/css/react-big-calendar.css";


const App = (props) => {
  return (
    <div className="App">
      <GlobalContext>
        <BrowserRouter>
          <Switch>
            <Route exact path='/main' component={Main} />
            <Route exact path='/' component={Login} />
          </Switch>
        </BrowserRouter>
      </GlobalContext>
    </div >
  );
}

export default App;