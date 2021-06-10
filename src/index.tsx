import React from 'react'
import ReactDOM from 'react-dom'
import Enhetsregisteret from './components/Enhetsregisteret'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Enhetsregisteret />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
