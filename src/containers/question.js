import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import Answer from '../components/answer';
import Question from '../components/question';

class SmartQuestion extends Component {
    render() {
        if (!this.props.question) {
            return null;
        }

        const {
            question,
            answers = []
        } = this.props.question;

        const isCorrect = this.props.isCorrect;
        const isAnswered = this.props.isNextReady;

        return (
            <Question
                isAnswered={isAnswered}
                isCorrect={isCorrect}
                question={question}
                step={this.props.step}
                totalSteps={this.props.totalSteps}
            >
                {
                    answers.map( (item, idx) => {
                        return (
                            <Answer
                                key={idx}
                                isDisabled={isAnswered}
                                isCorrect={item.correct}
                                hint={item.hint}
                                onClick={this.props.onAnswer}
                            >
                                {item.answer}
                            </Answer>
                        );
                    })
                }
            </Question>
        );
    }
}

SmartQuestion.propTypes = {
    isCorrect: PropTypes.bool,
    isNextReady: PropTypes.bool,
    onAnswer: PropTypes.func,
    step: PropTypes.number,
    question: PropTypes.object,
    totalSteps: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
    isCorrect: ownProps.isCorrect,
    isNextReady: ownProps.isNextReady,
    onAnswer: ownProps.onAnswer,
    step: ownProps.step,
    totalSteps: ownProps.totalSteps,
    question: state.currentQuestion
});

export default connect(mapStateToProps)(SmartQuestion);
