import * as React from 'react';
import { connect } from 'react-redux';
import * as Example from './models/example';
import * as Another from './models/another';

interface Props extends Example.Props, Example.Actions, Another.Props, Another.Actions {
}

class App extends React.Component<Props, {}> {
	render() {
		console.log('App', this.props);
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Welcome to React</h1>
				</header>

				<div>{this.props.x}</div>
				<div><button onClick={() => this.props.increment()}>inc</button></div>
				<div><button onClick={() => this.props.increment2()}>inc2</button></div>
				<div><button onClick={() => this.props.incrementAsync()}>incAsync</button></div>

				<div>{this.props.y}</div>
				<div><button onClick={() => this.props.decrement()}>dec</button></div>
				<div><button onClick={() => this.props.decrement2()}>dec2</button></div>
				<div><button onClick={() => this.props.decrementAsync()}>decAsync</button></div>
			</div>
		);
	}
}

const mapState = (models: { example: Example.Props, another: Another.Props }) => {
	return {
		...models.example,
		...models.another,
	};
}

const mapDispatch = (models: { example: Example.Actions, another: Another.Actions }) => {
	return {
		...models.example,
		...models.another,
	} as any;
}

export default connect(mapState, mapDispatch)(App) as any;
