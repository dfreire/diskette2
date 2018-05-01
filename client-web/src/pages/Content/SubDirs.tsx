import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ContentModel from '../../models/Content';
const { Icon } = require('react-fa');

interface Props extends ContentModel.State, ContentModel.Dispatch {
    location: Location;
}

const SubDirs = (props: Props) => {
    return (
        <div className="text-sm md:border-l">
            <div className="py-3 md:px-3">
                <button className={"w-full bg-green hover:bg-green-light text-white p-3 rounded"}>
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

    return (
        <li className={"group flex md:pl-1 bg-white hover:bg-grey-lighter"}>
            <Link to={to} className="flex-1 p-3 text-grey-darker hover:text-black no-underline truncate" title={props.name}>{props.name}</Link>
            <button className="invisible group-hover:visible m-1 mr-0 p-1 text-grey hover:text-black"><Icon name="cog" /></button>
            <button className="invisible group-hover:visible m-1 mr-3 p-1 text-grey hover:text-black"><Icon name="trash" /></button>
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