import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ContentModel from '../../models/Content';
const { Icon } = require('react-fa');

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

const SubDirs = (props: Props) => {
    const hasSubDirs = props.contentPage.content.subDirs.length > 0;
    const roundedBottom = hasSubDirs ? '' : 'rounded-b';

    return (
        <div className="text-sm">
            <div className="">
                <button className={`w-full bg-green hover:bg-green-light text-white p-3 rounded-tl rounded-tr ${roundedBottom}`}>
                    <Icon name="plus" />
                </button>
            </div>
            <ul className="list-reset">
                {props.contentPage.content.subDirs.map((name, i) => {
                    const isLast = i === props.contentPage.content.subDirs.length - 1;
                    return <SubDir key={name} location={props.location} name={name} isLast={isLast} />;
                })}
            </ul>
        </div>
    );
}

const SubDir = (props: { location: Location; name: string; isLast: boolean }) => {
    const to = [props.location.pathname, props.name].join('/');

    const roundedBottom = props.isLast ? 'rounded-b' : '';

    return (
        <li className={`group flex bg-black hover:bg-grey-darkest border-b border-grey-darkest ${roundedBottom}`}>
            <Link to={to} className="flex-1 p-3 text-white no-underline truncate" title={props.name}>{props.name}</Link>
            <button className="invisible group-hover:visible m-1 mr-0 p-1 text-grey hover:text-white"><Icon name="cog" /></button>
            <button className="invisible group-hover:visible m-1 mr-3 p-1 text-grey hover:text-white"><Icon name="trash" /></button>
        </li>
    );
}

const mapState = (models: { content: ContentModel.State }) => ({
    contentPage: models.content.contentPage,
});

const mapDispatch = (models: { content: ContentModel.Dispatch }) => ({
    onLoad: models.content.onLoad,
}) as any;

export default connect(mapState, mapDispatch)(SubDirs);