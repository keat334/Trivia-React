import React, { PropTypes } from 'react';

import cls from 'classnames';

const Question = props => {
    const {
        isAnswered,
        isCorrect,
        children,
        question,
        step,
        totalSteps
    } = props;
    
    return (
        <section className="trivia-question">
            <div className="box is-paddingless">
                <div className={cls('notification', {
                    'is-success': isAnswered && isCorrect,
                    'is-danger': isAnswered && !isCorrect
                })}>
                    <em className="subtitle is-6">
                        <b>{step} / {totalSteps}</b>
                    </em>
                    <br/>
                    <strong className="title is-4">
                        {question}
                    </strong>
                </div>
            </div>
            <div className="box">
                {children}
            </div>
        </section>
    );
};

Question.propTypes = {
    isAnswered: PropTypes.bool,
    isCorrect: PropTypes.bool,
    children: PropTypes.node,
    question: PropTypes.node,
    step: PropTypes.number,
    totalSteps: PropTypes.number
};

export default Question;
