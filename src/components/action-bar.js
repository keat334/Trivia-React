import React, { PropTypes } from 'react';

import Button from './button';

const ActionBar = props => {
    const {
        isStart,
        isComplete,
        isNextReady,
        isLastQuestion,
        onStartClick,
        onNextClick,
        resources
    } = props;

    return (
        <section className="trivia-action-bar">
            <div className="box">
                {
                    isStart ?
                    <Button
                        full
                        mode="primary"
                        onClick={onStartClick}
                        size="large"
                    >
                        { resources['start'] }
                    </Button> : (
                        isComplete ?
                        <Button
                            full
                            mode="secondary"
                            onClick={onStartClick}
                            size="large"
                        >
                            { resources['restart'] }
                        </Button> :
                        <Button
                            disabled={!isNextReady}
                            full
                            mode="primary"
                            onClick={onNextClick}
                            size="medium"
                        >
                            {
                                isLastQuestion ?
                                resources['showResults'] :
                                resources['nextQuestion']
                            }
                        </Button>
                    )
                }
            </div>
        </section>
    );
};

ActionBar.propTypes = {
    isStart: PropTypes.bool,
    isComplete: PropTypes.bool,
    isNextReady: PropTypes.bool,
    isLastQuestion: PropTypes.bool,
    onStartClick: PropTypes.func,
    onNextClick: PropTypes.func,
    resources: PropTypes.object
};

export default ActionBar;
