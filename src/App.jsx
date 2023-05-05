import { Redirect, Route, Switch } from "wouter"
import Table from "./components/Table"
import Title from "./components/Title"
import UserInfo from "./components/UserInfo"

const App = () => {
  return (
    <div className="h-screen flex flex-col pb-10 pt-5">
      <Switch>
        <Route path='/'><Title /><Table /></Route>
        <Route path='/user'><UserInfo /></Route>
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default App