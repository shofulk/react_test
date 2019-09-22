import React, { Component } from 'react';
import classes from './TestList.module.css';
import {NavLink} from 'react-router-dom';
import Loader from '../../component/UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchTest} from '../../store/actions/test'

class TestList extends Component {
    

    renderList(){
        return this.props.tests.map((list) => {
            return (
                <li key={list.id}>
                    <NavLink to= {'/test/' + list.id}>
                        {list.name}
                    </NavLink>
                </li>
            );
        })
    }

    componentDidMount(){

        this.props.fetchTest();

    }

    render() {
        return (
            <div className={classes.TestList}>
                {
                    this.props.loading && this.props.tests.length !== 0 ? <Loader/> : <div>
                    <h1>Test List</h1>
                        <ul>
                            {this.renderList()}
                        </ul>
                    </div>
                }
                
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tests: state.tests.tests,
        loading: state.tests.loading
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchTest: () => dispatch(fetchTest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestList);