import * as React from 'react';
import { connect } from 'react-redux';
import * as ContentModel from '../../models/Content';
import * as Types from '../../models/Types';
import Tabs from '../../components/Tabs';
// const { Icon } = require('react-fa');

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

const Form = (props: Props) => {
    return (
        <div>
            <Tabs titles={props.contentPage.contentType.tabs.map(tab => tab.title)}>
                {props.contentPage.contentType.tabs.map(tab => {
                    return <Fields fields={tab.fields} content={props.contentPage.content} />;
                })}
            </Tabs>
        </div>
    );
}

const Fields = (props: { fields: Types.Field[]; content: Types.Content }) => {
    return (
        <div>
            {props.fields.map(field => <Field field={field} value={props.content.fields[field.key]} />)}
        </div>
    );
}

const Field = (props: { field: Types.Field; value: any }) => {
    return (
        <div>
            <h1>{props.field.key}</h1>
            <div>{props.field.label}</div>
            <div>{JSON.stringify(props.value)}</div>
        </div>
    );
}

const mapState = (models: { content: ContentModel.State }) => ({
    contentPage: models.content.contentPage,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    onLoad: models.content.onLoad,
}) as any;

export default connect(mapState, mapDispatch)(Form);