import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../component/UI/Button/Button';
import Input from '../../component/UI/Input/Input';
import {connect} from 'react-redux';
import {auth} from '../../store/actions/auth'
 
class Auth extends Component {
    state = { 
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'E-mail',
                errorMessage: 'Enter valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter valid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
     }

    loginHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );

        
        
    }

    registHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );

        // try{
        //     let response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzGxqDdwYbBSU3S-uFwgLdNKE4ucjVBKc', userData);

        //     console.log(response.data);
        // }catch(e){
        //     console.log(e);
        // }
        
    }

    onChangeHandler = (event, controlName) => {
        let formControls = { ...this.state.formControls };
        let control = { ...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        function validate(value, validation){
            if (!validation){
                return true;
            }

            let isValid = true;

            if (validation.required){
                isValid = value.trim() !== '' && isValid
            } if(validation.email){
                isValid = (function validateEmail(email) {
                    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                })(value) && isValid
            } if(validation.minLength){
                isValid = value.length >= validation.minLength && isValid
            }

            return isValid;
        }


        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls, isFormValid
        });
    }

    submitHandler = (event) => {
        console.log('submitHandler');
        event.preventDefault();
    }

    renderInput = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            let control = this.state.formControls[controlName];
            return (
                <Input
                    key = {controlName + index}
                    type = {control.type}
                    value = {control.value}
                    valid = {control.valid}
                    touched = {control.touched}
                    label = {control.label}
                    errorMessage = {control.errorMessage}
                    shouldValidate = {true}
                    onChange = {event => {this.onChangeHandler(event, controlName)}}
                />
            );
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>
                    <form onSubmit = {this.submitHandler} className={classes.AuthForm}>
                        {this.renderInput()}
                        
                        <Button type="success" onRetry={this.loginHandler} disabled = {!this.state.isFormValid}>Log In</Button>
                        <Button type="primary" onRetry={this.registHandler} disabled = {!this.state.isFormValid}>Sign up</Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return {
        auth: (email, password, isLogin) => {dispatch(auth(email, password, isLogin));}
    }
}


export default connect(null, mapDispatchToProps)(Auth);