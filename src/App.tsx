import './index.css'
import { Purchase } from './pages/Purchase'
import { TrackSales } from './pages/Admin/pages'
import { SignUp } from './pages/Account/components'
import { Home, Cart, Account, Admin } from './pages'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/account'>
          <Account />
        </Route>
        <Route exact path='/signUp'>
          <SignUp />
        </Route>
        <Route exact path='/admin'>
          <Admin />
        </Route>
        <Route exact path='/purchase'>
          <Purchase />
        </Route>
        <Route exact path='/admin/vendas'>
          <TrackSales />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
