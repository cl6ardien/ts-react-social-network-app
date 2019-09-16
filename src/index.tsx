import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// Authentication context
import { AuthContextProvider } from './auth_context';

// components
import Navigation from './components/Navigation';

export const SERVIDOR = '//s.clbs9571.now.sh';
export const PUBLIC = '//s-cu4i3le1z.now.sh';

ReactDOM.render(
	<AuthContextProvider>
		<Router>
			<Navigation />
			<App />
		</Router>
	</AuthContextProvider>, document.getElementById('root'));