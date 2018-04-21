import * as React from 'react';
import * as Example from '../models/example';
import { connect } from 'react-redux';

interface ExampleProps extends Example.Props, Example.Actions {
}

const ExampleView = (props: ExampleProps) => (
    <div>
        {console.log('ExampleView', props) && false}
        <h2>ExampleView</h2>
        <div>{props.x}</div>
        <div><button onClick={() => props.increment()}>inc</button></div>
        <div><button onClick={() => props.increment2()}>inc2</button></div>
        <div><button onClick={() => props.incrementAsync()}>incAsync</button></div>
    </div>
);

const mapState = (models: { example: Example.Props }) => ({ ...models.example });
const mapDispatch = (models: { example: Example.Actions }) => ({ ...models.example }) as any;
export default connect(mapState, mapDispatch)(ExampleView) as any;
