import { combineReducers } from 'redux';

import initialState from './initialState';

import questionsReducer from './questionsReducer';
import resultsReducer from './resultsReducer';

import {
    REQUESTED_FIRST_QUESTION,
    REQUESTED_NEXT_QUESTION,
    TOGGLED_NEXT_READY,
    SELECTED_ANSWER
} from '../constants';

const currentStepReducer = (state = initialState.currentStep, action) => {
    switch (action.type) {
        case REQUESTED_FIRST_QUESTION:
            return initialState.currentStep + 1;

        case REQUESTED_NEXT_QUESTION:
            return action.payload + 1;

        default:
            return state;
    }
};

const currentQuestionReducer = (state = initialState.currentQuestion, action) => {
    switch (action.type) {
        case REQUESTED_FIRST_QUESTION:
            return questionsReducer()[0];

        case REQUESTED_NEXT_QUESTION:
            return questionsReducer()[action.payload] || state;

        default:
            return state;
    }
};

const isNextReadyReducer = (state = initialState.isNextReady, action) => {
    switch (action.type) {
        case TOGGLED_NEXT_READY:
            return action.payload;

        default:
            return state;
    }
};

const scoreReducer = (state = initialState.score, action) => {
    switch (action.type) {
        case SELECTED_ANSWER:
            return action.payload ? state + 1 : state;

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    currentStep: currentStepReducer,
    currentQuestion: currentQuestionReducer,
    isNextReady: isNextReadyReducer,

    score: scoreReducer,

    questions: questionsReducer,
    results: resultsReducer
});

export default rootReducer;
