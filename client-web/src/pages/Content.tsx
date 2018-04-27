import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ContentModel from '../models/Content';

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

interface State { };

class Content extends React.Component<Props, State> {
    render() {
        return (
            <div>
                {console.log('Content', this.props) && false}
                <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-2/3">
                        <h2>Content</h2>
                        <div>{JSON.stringify(this.props.contentPage)}</div>
                    </div>
                    <div className="w-full sm:w-1/3 bg-yellow-lightest">
                        {this._renderSubDirs()}
                    </div>
                </div>
            </div>
        );
    }

    _renderSubDirs() {
        return (
            <ul>
                {this.props.contentPage.content.subDirs.map(subDir => {
                    return (
                        <li key={subDir}>
                            <Link to={`${this.props.location.pathname}/${subDir}`}>{subDir}</Link>
                        </li>
                    );
                })}
            </ul>
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
