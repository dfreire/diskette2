import * as React from 'react';
import { connect } from 'react-redux';
import * as UserModel from '../models/User';

interface Props {
}

const Content = (props: Props) => (
    <div>
        {console.log('Content', props) && false}
        <h2>Content</h2>
    </div>
);

const mapState = (models: { user: UserModel.State }) => ({
});

const mapDispatch = (models: { user: UserModel.Dispatch }) => ({
}) as any;

export default connect(mapState, mapDispatch)(Content);
