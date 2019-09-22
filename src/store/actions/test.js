import axios from '../../axios/axios-test';
import {FETCH_TESTS_START, 
        FETCH_TESTS_SUCCESS, 
        FETCH_TESTS_ERROR, 
        FETCH_QUIZ_SUCCESS, 
        TEST_SET_STATE, 
        TEST_FINISH,
        TEST_NEXT_QUESTION,
        RETRY_TEST} from './actionType'

export function fetchTest(){
   return async dispatch => { 
       dispatch(fetchTestStart());
       try{
            let response = await axios.get('/test.json');
            
            let test = [];

            // console.log(response);

            Object.keys(response.data).forEach((key, index) => {
                test.push({
                    id: key,
                    name: `Test №${index + 1}`
                });
            });

            dispatch(fethcTestSuccess(test));
            
        }catch(e){
            dispatch(fetchTestError(e));
        }
    }
}

export function fetchTestStart(){
    return {
        type: FETCH_TESTS_START
    }
}

export function fethcTestSuccess(tests){
    return {
        type: FETCH_TESTS_SUCCESS, 
        tests
    }
}

export function fetchTestError(error){
    return {
        type: FETCH_TESTS_ERROR,
        error
    }
}

export function fetchTestById(testId){
    return async dispatch => {
        dispatch(fetchTestStart());

        try{
            let response = await axios.get(`/test/${testId}.json`);
            let test = response.data;

            // console.log(test);
            dispatch(fetchQuizSuccess(test));
        }catch(e){
            dispatch(fetchTestError(test));
        }
    }
}

export function fetchQuizSuccess(test){
    return {
        type: FETCH_QUIZ_SUCCESS,
        test
    }
}

export function testSetState(answerState, results){
    return {
        type: TEST_SET_STATE,
        answerState, results
    }
}

export function testFinished(){
    return {
        type: TEST_FINISH
    }
}

export function testNextQuestion(activeQuestion){
    return {
        type: TEST_NEXT_QUESTION,
        activeQuestion
    }
}

export function testAnswerClick(answerId){
    console.log(answerId)
    return (dispatch, getState) => {

        let state = getState().tests;

        if(state.answerState){
            let key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success'){
                return 
            }
        }

        let question = state.test[state.activeQuestion];
        let result = state.results;

        if(question.rightAnswerId === answerId){
            if(!result[question.id]){
                result[question.id] = 'success'
            }
            dispatch(testSetState({[answerId]: 'success'}, result));

            let timeOut = window.setTimeout(() => {
                if(isTestFinished(state)){
                    dispatch(testFinished());
                }else{
                    dispatch(testNextQuestion(state.activeQuestion + 1));
                }


                window.clearInterval(timeOut);
            }, 1000)

            
        }else{
            
            result[question.id] = 'error'
            console.log(result, "false ", state.answerState);
            dispatch(testSetState({[answerId]: 'error'}, result));
        }
    }
}

export function onRetryHandler(){
    return {
        type: RETRY_TEST
    }
}

function isTestFinished(state){
    return state.activeQuestion + 1 === state.test.length;
}