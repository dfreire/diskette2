import * as React from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ExampleView from './pages/Example';
import AnotherView from './pages/Another';
import * as Example from './models/example';
import * as Another from './models/another';

interface Props extends Example.Props, Example.Actions, Another.Props, Another.Actions {
}

class App extends React.Component<Props, {}> {
	render() {
		console.log('App', this.props);
		return (
			<div>
				<ul>
					<li>
						<Link to="/">ExampleView</Link>
					</li>
					<li>
						<Link to="/another">AnotherView</Link>
					</li>
				</ul>

				<hr />

				<Route exact path="/" component={ExampleView} />
				<Route path="/another" component={AnotherView} />
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

// export default connect(mapState, mapDispatch)(App) as any;
export default withRouter(connect(mapState, mapDispatch)(App) as any);
