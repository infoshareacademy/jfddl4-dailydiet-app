import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Auth from './Components/Auth'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './index.css'
import App from './App'

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Auth>
                <App />
            </Auth>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)