import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

    let inputType = props.type || 'text';
    let cls = [classes.Input];
    let htmlFor = `${inputType}--${Math.random()}`;

    function isInvalid({valid, touched, shouldValidate}){
        return !valid && shouldValidate && touched
    }

    if(isInvalid(props)){
        cls.push(classes.invalid);
    }

    

    return (
        <div className = {cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id = {htmlFor}
                value = {props.value}
                onChange = {props.onChange}
            >
            </input>

            {
                isInvalid(props) ? 
                <span>{props.errorMessage}</span>
                : null
            }
            
        </div>
    );
}

export default Input;