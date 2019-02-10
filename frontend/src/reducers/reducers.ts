import { combineReducers } from 'redux'
import {
    LOADING_SUCCESS,
    SET_DATASET,
    SET_TRAIN_MODE,
    TRAINING_STARTED,
    TRAINING_SUCCESS,
    UPDATE_FORM
} from '../actions/actions';

const trainMode = (state = {}, action: any) => {
    switch(action.type){
        case SET_TRAIN_MODE:
            return action.payload
        default:
            return state
    }
}

const dataset = (state = {}, action: any) => {
    switch(action.type){
        case SET_DATASET:
            return action.payload
        default:
            return state
    }
}

const trainingResults = (state = {}, action: any) => {
    switch(action.type){
        case TRAINING_STARTED:
            return {isLoading: true}
        case TRAINING_SUCCESS:
            return {isLoading: false, data: action.payload}
        default:
            return state
    }
}

const sampleData = (state = {}, action: any) => {
    switch (action.type) {
        case LOADING_SUCCESS:
            return action.payload
        default:
            return state
    }
}

const spec = (state = {}, action: any) => {
    switch (action.type) {
        case UPDATE_FORM:
            const {form, value} = action.payload
            const newState = {
                ...state,
                ...{
                    [form]: value
                }
            }
            return newState
        default:
            return state
    }
}

export default combineReducers({trainMode, trainingResults, sampleData, spec, dataset})