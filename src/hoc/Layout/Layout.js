import React, {Component} from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../component/Navigation/MenuToggle/MenuToggle'
import Menu from '../../component/Navigation/Menu/Menu'
import {connect} from 'react-redux'

class Layout extends Component {

    state = {
        menu: false
    }

    onToggleHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }   

    menuCloseHandler = () => {
        this.setState({
            menu: false
        });
    }

    render(){
        
        return(
            <div className={classes.Layout}>
                <MenuToggle onToggle = {this.onToggleHandler} isOpen={this.state.menu}/>
                <Menu isOpen={this.state.menu} onClose={this.menuCloseHandler} isAuthenticated = {this.props.isAuthenticated}/>

                

                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)