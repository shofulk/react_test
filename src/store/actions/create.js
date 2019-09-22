import {CREATE_TEST_QUESTION, RESET_TEST_CREATE} from './actionType';
import axios from '../../axios/axios-test';

export function createTestQuestion(item){
    return {
        type: CREATE_TEST_QUESTION,
        item
    }
}

export function createTestFinish(){
    return async (dispatch, getState) => {
        await axios.post('/test.json', getState().create.quiz);
        dispatch(resetTestCreate());
    }
}

export function resetTestCreate(){
    return {
        type: RESET_TEST_CREATE
    }
}