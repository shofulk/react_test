import React, { Component } from 'react';
import classes from './TestCreate.module.css';
import Button from '../../component/UI/Button/Button';
import {createControl, validate, validateForm} from '../../form/form';
import Input from '../../component/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../component/UI/Select/Select';
import {connect} from 'react-redux';
import {createTestQuestion, createTestFinish} from '../../store/actions/create'

function createOptionControl(number){
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Option can not be empty',
        id: number
    }, {required: true});
}

function createFormControls(){
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'Question can not be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    };
}

class TestCreate extends Component {
    state = { 
        rightAnswerId: 1,
        formControl: createFormControls(),
        isFormValid: false
     }

    submitHandler = (event) => {
        event.preventDefault();
    }   

    addQuestionHandler = () => {

        let questionItem = {
            question: this.state.formControl.question.value,
            id: this.props.test.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: this.state.formControl.option1.value, id: this.state.formControl.option1.id},
                {text: this.state.formControl.option2.value, id: this.state.formControl.option2.id},
                {text: this.state.formControl.option3.value, id: this.state.formControl.option3.id},
                {text: this.state.formControl.option4.value, id: this.state.formControl.option4.id}
            ]
        }

        this.props.createTestQuestion(questionItem);

        this.setState({
            rightAnswerId: 1,
            formControl: createFormControls(),
            isFormValid: false
        });
        
        

        console.log(this.state);

    }

    createTestHandler = (event) => {
        event.preventDefault();
        this.setState({
            test: [],
            rightAnswerId: 1,
            formControl: createFormControls(),
            isFormValid: false
        });

        this.props.createTestFinish();
        
    }

    changeHandler = (value, controlName) => {
        let formControl = { ...this.state.formControl };
        let control = { ...formControl[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControl[controlName] = control;

        this.setState({
            formControl,
            isFormValid: validateForm(formControl)
        })
    }

    renderInput(){
        return Object.keys(this.state.formControl).map((input, index) => {
            let control = this.state.formControl[input];

            return (
                <Auxiliary key={index}>
                    <Input
                        label = {control.label}
                        value = {control.value}
                        valid = {control.valid}
                        shouldValidate = {!!control.validation}
                        touched = {control.touched}
                        errorMessage = {control.errorMessage}
                        onChange = {event => this.changeHandler(event.target.value, input)}
                        />
                    { index === 0 ? <hr/> : null}
                </Auxiliary>
            );
        });
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        return (
            <div className={classes.TestCreate}>
                <div>
                    <h1>Test Create</h1>

                    <form onSubmit = {this.submitHandler}>
                        { this.renderInput() }
                        <Select
                            value={this.state.rightAnswerId}
                            label='Choose the right asnwer'
                            onChange={this.selectChangeHandler}
                            options={[
                                {text: 1, value: 1},
                                {text: 2, value: 2},
                                {text: 3, value: 3},
                                {text: 4, value: 4}
                            ]}
                        />
                        <Button
                            type='primary'
                            onRetry = {this.addQuestionHandler}
                            disabled = {!this.state.isFormValid}
                        >Add question</Button>
                        <Button
                            type='success'
                            onRetry = {this.createTestHandler}
                            disabled = {this.props.test.length === 0}
                        >Create Test</Button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateTpProps(state){
    return {
        test: state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return {
        createTestQuestion: item => dispatch(createTestQuestion(item)),
        createTestFinish: () => dispatch(createTestFinish())
    }
}

export default connect(mapStateTpProps, mapDispatchToProps)(TestCreate);