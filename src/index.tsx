import App from './App'
import { store } from './store'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
)
reportWebVitals()
