import React from 'react'
import classes from './MenuToggle.module.css'

export default (props) => {

    let cls = [
        classes.MenuToggle, 
        'fa'
    ]

    if(props.isOpen){
        cls.push('fa-times');
        cls.push(classes.open);
    }else{
        cls.push('fa-bars');
    }

    return(
        <i className = {cls.join(' ')}
            onClick = {props.onToggle}>

        </i>
    )
}