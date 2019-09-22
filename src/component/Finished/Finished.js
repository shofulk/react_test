import React from 'react'
import classes from './Finished.module.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

export default props => {

    let quantRight = Object.keys(props.result).reduce((total, key) => {
        if(props.result[key] === 'success'){
            total++;
        }

        return total;
    }, 0);

    return (
        <div className = {classes.Finished}>
            <ul>
                {/* <li><strong>1.</strong> How are you <i className ={'fa fa-times' + classes.error} > </i></li>
                <li><strong>2.</strong> How are you <i className ={'fa fa-check' + classes.success}></i></li> */}
                {props.test.map((question, index) => {
                    let cls = ['fa', 
                                props.result[question.id] === 'error' ? 'fa-times' : 'fa-check',
                                classes[props.result[question.id]]];
                    return (    
                        <li key = {index}>
                            <strong>{index + 1}.</strong>&nbsp;
                            {question.question}&nbsp;
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>
                Right {quantRight} with {props.test.length}
            </p>
            <div>
                <Button onRetry = {props.onRetry} type = "primary">Repeat</Button> 
                <Link to ='/'>
                    <Button type = "success">Go to list test</Button> 
                </Link>
            </div>
        </div>
    );
}
