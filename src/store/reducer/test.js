import {FETCH_TESTS_START, 
        FETCH_TESTS_SUCCESS, 
        FETCH_TESTS_ERROR, 
        FETCH_QUIZ_SUCCESS, 
        TEST_SET_STATE,
        TEST_FINISH,
        TEST_NEXT_QUESTION,
        RETRY_TEST} from '../actions/actionType';

let initialState = {
    tests: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null, 
    test: null
};

export function testReducer(state = initialState, action){

    switch(action.type){
        case FETCH_TESTS_SUCCESS: return {
            ...state, loading: false, tests: action.tests
        }
        case FETCH_TESTS_START:return  {
            ...state, loading: true
        }
        case FETCH_TESTS_ERROR: return {
            ...state, loading: false, error: action.error
        }
        case FETCH_QUIZ_SUCCESS: return {
            ...state, loading: false, test: action.test
        }
        case TEST_SET_STATE: return {
            ...state, answerState: action.answerState, results: action.results
        }
        case TEST_FINISH: return {
            ...state, isFinished: true
        }
        case TEST_NEXT_QUESTION: return {
            ...state, activeQuestion: action.activeQuestion, answerState: null
        }
        case RETRY_TEST: return {
            ...state,
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            result: {}
        }
        default: return state
    }

}