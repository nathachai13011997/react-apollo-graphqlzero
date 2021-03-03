import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import User from './content/User'
import Create from './content/Create'
import EditUser from './content/EditUser'

const App = () => {
  return <>
    <Router>
      <Switch>
      <Route path="/edit/:id" >
        <EditUser />
      </Route>
        <Route path="/create" >
          <Create />
        </Route>
        <Route exact path="/" >
          <User />
        </Route>
      </Switch>
    </Router>
  </>
}

export default App;
