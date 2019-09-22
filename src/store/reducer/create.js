import {CREATE_TEST_QUESTION, RESET_TEST_CREATE} from '../actions/actionType'

let initialState = {
    quiz: []
}

export default function createReducer(state = initialState, action){
    switch(action.type){
        case CREATE_TEST_QUESTION: return {
            ...state, 
            quiz: [...state.quiz, action.item]
        }
        case RESET_TEST_CREATE: return {
            ...state,
            quiz: []
        }
        default: return state
    }
}