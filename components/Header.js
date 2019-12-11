import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu stackable style={{ marginTop: '10px' }}>
            <Link route="/">
                <a className="item">
                    CrowdCoin by Sourabh Bagrecha
                </a>
            </Link>
            <Link route="https://github.com/">
                <a className="item">
                    <Icon color="violet" size="big" name='github' />
                </a>
            </Link>
            <Link route="https://www.linkedin.com/in/sourabhbagrecha/">
                <a className="item">
                    <Icon color="violet" size="big" name='linkedin' />
                </a>
            </Link>
            <Link route="mailto://sourabhbagrecha@gmail.com">
                <a className="item">
                    <Icon color="violet" size="big" name='mail' />
                </a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">Campaigns</a>
                </Link> 
                <Link route="/campaigns/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}