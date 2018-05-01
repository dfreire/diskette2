import * as React from 'react';
import { connect } from 'react-redux';
import * as ContentModel from '../../models/Content';
import Form from './Form';
import SubDirs from './SubDirs';

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

interface State { };

class Content extends React.Component<Props, State> {
    render() {
        return (
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/3 p-4">
                    <Form {...this.props} />
                </div>
                <div className="w-full md:w-1/3 p-4">
                    <SubDirs {...this.props} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.onLoad({ pathname: this.props.location.pathname });
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.location.pathname != this.props.location.pathname) {
            this.props.onLoad({ pathname: this.props.location.pathname });
        }
    }
}

const mapState = (models: { content: ContentModel.State }) => ({
    contentPage: models.content.contentPage,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    onLoad: models.content.onLoad,
}) as any;

export default connect(mapState, mapDispatch)(Content);
