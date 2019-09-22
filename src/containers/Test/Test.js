import React, {Component} from 'react';
import classes from './Test.module.css';
import ActiveTest from '../../component/ActiveTest/ActiveTest';
import Finished from '../../component/Finished/Finished';
import Loader from '../../component/UI/Loader/Loader';
import {connect} from 'react-redux';
import {fetchTestById, testAnswerClick, onRetryHandler} from '../../store/actions/test'

class Test extends Component{  

    componentDidMount(){
        this.props.fetchTestsById(this.props.match.params.id);
    }

    componentWillUnmount(){
        this.props.onRetryHandler();
    }

    render(){
        console.log(this.props)
        return(
            <div className={classes.Test}>
                <div className={classes.TestWrapper}>
                <h1 className={classes.H1}>Test</h1>
                {
                    this.props.loading || !this.props.test ? <Loader/> : 
                    
                        this.props.isFinished ? 
                            <Finished result = {this.props.results} test = {this.props.test} onRetry = {this.props.onRetryHandler}/> : 
                            <ActiveTest 
                                answers={this.props.test[this.props.activeQuestion].answers}  
                                question={this.props.test[this.props.activeQuestion].question} 
                                onAnswerClick = {this.props.testAnswerClick} 
                                testLength = {this.props.test.length}
                                number = {this.props.activeQuestion + 1}
                                state=  {this.props.answerState}
                                />
                    
                }
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        results: state.tests.results,
        isFinished: state.tests.isFinished,
        activeQuestion: state.tests.activeQuestion,
        answerState: state.tests.answerState, 
        test: state.tests.test,
        loading: state.tests.loading
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchTestsById: id => dispatch(fetchTestById(id)),
        testAnswerClick: answerId => dispatch(testAnswerClick(answerId)),
        onRetryHandler: () => dispatch(onRetryHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);