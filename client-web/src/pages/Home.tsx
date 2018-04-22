import * as React from 'react';
import { connect } from 'react-redux';
import * as UserModel from '../models/User';

interface Props extends UserModel.State, UserModel.Dispatch {
}

const Home = (props: Props) => (
    <div>
        {console.log('Home', props) && false}
        <h2>Home</h2>
        <button onClick={props.logout}>Logout</button>
    </div>
);

const mapState = (models: { user: UserModel.State }) => ({
    ...models.user
});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
    logout: models.user.logout
}) as any;

export default connect(mapState, mapDispatch)(Home) as any;
