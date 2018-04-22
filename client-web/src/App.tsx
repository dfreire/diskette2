import * as React from 'react';
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import * as UserModel from './models/User';

interface Props extends UserModel.State, UserModel.Dispatch {
}

class App extends React.Component<Props, {}> {
	render() {
		console.log('App', this.props);
		const isLoggedIn = this.props.sessionToken.length > 0;
		const isLoggedOut = !isLoggedIn;

		return (
			<div>
				<ul>
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/home">Home</Link></li>
				</ul>

				<hr />
				<Switch>
					{isLoggedIn && <Route path="/home" component={Home} />}
					{isLoggedIn && <Redirect to="/home" />};

					{isLoggedOut && <Route path="/login" component={Login} />}
					{isLoggedOut && <Redirect to="/login" />};
				</Switch>
			</div>
		);
	}
}

const mapState = (models: { user: UserModel.State }) => ({
	sessionToken: models.user.sessionToken,
});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
});

export default withRouter(connect(mapState, mapDispatch)(App) as any);
