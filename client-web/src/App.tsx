import * as React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import Content from './pages/Content';
import Login from './pages/Login';
import * as UserModel from './models/User';

interface Props extends UserModel.State {
}

class App extends React.Component<Props, {}> {
	render() {
		const isLoggedIn = this.props.sessionToken.length > 0;
		const widthClass = isLoggedIn ? 'max-w-lg' : 'max-w-xs';

		return (
			<div className={`container mx-auto bg-white rounded overflow-hidden shadow-lg ${widthClass} font-sans`}>
				<div className="bg-black text-white p-4">
					<h2>Diskette</h2>
				</div>
				{isLoggedIn ? this._renderLoggedIn() : this._renderLoggedOut()}
			</div>
		);
	}

	_renderLoggedIn() {
		return (
			<div>
				<Breadcrumb />
				<div className="p-4">
					<Switch>
						<Route path="/content" component={Content} />
						<Redirect to="/content" />
					</Switch>
				</div>
			</div>
		);
	}

	_renderLoggedOut() {
		return (
			<div className="p-4">
				<Switch>
					<Route path="/login" component={Login} />
					<Redirect to="/login" />
				</Switch>
			</div>
		);
	}
}

const mapState = (models: { user: UserModel.State }) => ({
	sessionToken: models.user.sessionToken,
});

export default withRouter(connect(mapState)(App) as any);
