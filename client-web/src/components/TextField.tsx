import * as React from 'react';

interface Props {
    label: string;
    value: string;
    onChange: { (value: string): void }
}

const TextField = (props: Props) => (
    <div className={classNames.field}>
        <label className={classNames.label}>{props.label}</label>
        <input className={classNames.input} type="text" value={props.value} onChange={evt => props.onChange(evt.target.value)} />
    </div>
);

const classNames = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    input: "block p-2 w-full border rounded",
}

export default TextField;
