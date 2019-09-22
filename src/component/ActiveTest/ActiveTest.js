import React from 'react'
import classes from './ActiveTest.module.css'
import AnswerList from './AnswerList/AnswerList'

export default (props) => {
    
    console.log(props);

    return(
    
    <div className={classes.ActiveTest}>
        <p className={classes.question}>
            <span>
                <strong>{props.number}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.number} with {props.testLength}</small>
        </p>

        <AnswerList answers={props.answers} onAnswerClick={props.onAnswerClick} state={props.state}/>
    </div>
)}