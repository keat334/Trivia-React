import {
    REQUESTED_FIRST_QUESTION,
    REQUESTED_NEXT_QUESTION,
    SELECTED_ANSWER,
    TOGGLED_NEXT_READY
} from '../constants';

export const firstQuestionSelect = () => ({
    type: REQUESTED_FIRST_QUESTION
});

export const nextQuestionSelect = step => ({
    type: REQUESTED_NEXT_QUESTION,
    payload: step
});

export const selectAnswer = isCorrect => ({
    type: SELECTED_ANSWER,
    payload: isCorrect
});

export const nextQuestionReady = (ready = true) => ({
    type: TOGGLED_NEXT_READY,
    payload: ready
});
