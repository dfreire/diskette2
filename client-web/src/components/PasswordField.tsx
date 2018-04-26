import * as React from 'react';

interface Props {
    label: string;
    value: string;
    onChange: { (value: string): void }
}

const PasswordField = (props: Props) => (
    <div className={classNames.field}>
        <label className={classNames.label}>Password</label>
        <input className={classNames.input} type="password" value={props.value} onChange={evt => props.onChange(evt.target.value)} />
    </div>
);

const classNames = {
    field: "w-full py-2",
    label: "block pb-2 text-grey-darkest font-medium",
    input: "block p-2 w-full border rounded",
}

export default PasswordField;
