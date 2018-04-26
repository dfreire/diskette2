import * as React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import Content from './pages/Content';
import Login from './pages/Login';
import * as UserModel from './models/User';

interface Props extends UserModel.State, UserModel.Dispatch {
}

class App extends React.Component<Props, {}> {
	render() {
		const isLoggedIn = this.props.sessionToken.length > 0;
		const widthClass = isLoggedIn ? 'max-w-lg' : 'max-w-xs';

		return (
			<div className={`container mx-auto bg-white rounded overflow-hidden shadow-lg ${widthClass} font-sans`}>
				<div className="flex bg-black">
					<div className="flex-1 text-white p-4"><h2>Diskette</h2></div>
					{isLoggedIn && this._renderLogout()}
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

	_renderLogout() {
		return (
			<div className="">
				<button
					className="rounded-bl text-grey hover:bg-grey-darkest hover:text-white font-thin p-2 w-8 font-mono"
					onClick={this.props.logout}
				>
					x
			</button>
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

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
	logout: models.user.logout
}) as any;

export default withRouter(connect(mapState, mapDispatch)(App) as any);
