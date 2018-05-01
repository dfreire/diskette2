import * as React from 'react';

interface Props {
    label: string;
    value: string;
    pathname: string;
    onChange: { (value: string): void }
}

const ImageField = (props: Props) => {
    const tokens = props.pathname.split('/').filter(t => t.length > 0);
    tokens[0] = 'files';
    const src = ['/api', ...tokens, props.value].join('/');
    return (
        <div className={classNames.field}>
            <label className={classNames.label}>{props.label}</label>
            <img src={src} alt="" />
            <p>{src}</p>
            <p>{props.pathname}</p>
            <p>{props.value}</p>
        </div>
    );
}

const classNames = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    input: "block p-2 w-full border rounded",
}

export default ImageField;
