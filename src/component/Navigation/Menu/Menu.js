import React, {Component} from 'react'
import classes from './Menu.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

class Menu extends Component{

    clickHandler = () => {
        this.props.onClose();
    }

    renderLink(links){
        return links.map((link, index) => {
            return (
                <li key = {index}>
                    <NavLink
                        to = {link.to}
                        activeClassName = {classes.active}
                        exact = {link.exact}
                        onClick = {this.clickHandler}
                    >
                        {link.name}    
                    </NavLink>    
                </li>
            )
        });
    }

    render(){

        let cls = [classes.Menu];

        if(!this.props.isOpen){
            cls.push(classes.close);
        }

        let links = [
            {to: '/', name: 'List', exact: true}
            
        ]

        if(this.props.isAuthenticated){
            links.push({to: '/test-creater', name: 'Create test', exact: false})
            links.push({to: '/logout', name: 'Logout', exact: false})
        }else{
            links.push({to: '/auth', name: 'Auth', exact: false})
        }

        return(
            <React.Fragment>
                <nav className = {cls.join(' ')}>
                    <ul>
                        {this.renderLink(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        );
    }
}

export default Menu;