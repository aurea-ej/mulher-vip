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
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/account'>
          <Account />
        </Route>
        <Route path='/signUp'>
          <SignUp />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/purchase'>
          <Purchase />
        </Route>
        <Route path='/admin/vendas'>
          <TrackSales />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
