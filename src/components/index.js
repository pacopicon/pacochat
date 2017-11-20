import React from 'react'
import ReactDOM from 'react-dom'
import MessageBox from './MessageBox'
import '../styles/main.css'
import App from './App'
import registerServiceWorker from '../registerServiceWorker'

ReactDOM.render(
	<MessageBox 	
		url='http://localhost:7777/messages' 
		pollInterval={2000} 
	/>, document.getElementById('root')
)
registerServiceWorker()
