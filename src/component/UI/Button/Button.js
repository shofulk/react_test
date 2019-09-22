import React from 'react'
import classes from './Button.module.css';

export default (props) => {

    let cls = [classes.Button, 
               classes[props.type]];

    return (<button
                onClick = {props.onRetry}
                className = {cls.join(" ")}
                disabled = {props.disabled}>
                {props.children}
            </button>);
}