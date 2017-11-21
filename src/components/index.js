import React from 'react'
import ReactDOM from 'react-dom'
import MessageBox from './MessageBox'
import '../styles/main.css'
import App from './App'
import registerServiceWorker from '../registerServiceWorker'

ReactDOM.render(
	<MessageBox 	
		GETurl='http://localhost:7777/messages'
		POSTurl='http://localhost:7777/addMessage' 
		pollInterval={2000} 
	/>, document.getElementById('root')
)
registerServiceWorker()
