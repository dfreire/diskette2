import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './js/App';
import './index.css';

export default App

if (typeof document !== 'undefined') {
	const renderMethod = module['hot'] ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render;
	const render = Comp => {
		renderMethod(<Comp />, document.getElementById('root'));
	}
	render(App);
}
