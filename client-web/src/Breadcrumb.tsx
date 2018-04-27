import * as React from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends React.Component {
    render() {
        const tokens = window.location.pathname.split('/').filter(t => t.length > 0);
        const links = [{
            to: '/content',
            component: <Link className="text-black no-underline" to={'/content'}>home</Link>,
        }];

        for (let i = 1; i < tokens.length; i++) {
            const previousTo: string = i === 0 ? '' : links[i - 1].to;
            const to = previousTo + '/' + tokens[i];
            const component = <Link className="text-black no-underline" to={to}>{tokens[i]}</Link>;
            links.push({ to, component });
        }

        return (
            <div className="bg-grey-light p-3">
                {links.map((link, i) => (
                    <span key={link.to}>{link.component} {i < tokens.length - 1 ? ' / ' : ''}</span>
                ))}
            </div>
        );
    }
}

export default Breadcrumb;
