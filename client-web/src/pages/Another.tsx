import * as React from 'react';
import * as Another from '../models/another';
import { connect } from 'react-redux';

interface Props extends Another.State, Another.Actions {
}

const AnotherView = (props: Props) => (
    <div>
        {console.log('AnotherView', props) && false}
        <h2>AnotherView</h2>
        <div>{props.y}</div>
        <div><button onClick={() => props.decrement()}>dec</button></div>
        <div><button onClick={() => props.decrement2()}>dec2</button></div>
        <div><button onClick={() => props.decrementAsync()}>decAsync</button></div>
    </div>
);

const mapState = (models: { another: Another.State }) => ({ ...models.another });
const mapDispatch = (models: { another: Another.Actions }) => ({ ...models.another }) as any;
export default connect(mapState, mapDispatch)(AnotherView) as any;
