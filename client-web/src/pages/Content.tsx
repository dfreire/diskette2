import * as React from 'react';
import { connect } from 'react-redux';
import * as ContentModel from '../models/Content';

interface Props extends ContentModel.State, ContentModel.Dispatch {
}

class Content extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                {console.log('Content', this.props) && false}
                <h2>Content</h2>
            </div>
        );
    }

    componentDidMount() {
        this.props.onLoad();
    }
}

const mapState = (models: { content: ContentModel.State }) => ({
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    onLoad: models.content.onLoad,
}) as any;

export default connect(mapState, mapDispatch)(Content);
