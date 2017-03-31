import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import {
    firstQuestionSelect,
    nextQuestionSelect,
    selectAnswer,
    nextQuestionReady
} from '../actions';

import resources from '../resources';

import ActionBar from '../components/action-bar';
import Progress from '../components/progress';
import Splash from '../components/splash';

import Question from './question';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleStart = this.handleStart.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);

        this.state = {
            isCorrect: true
        };
    }

    handleStart() {
        this.props.firstQuestionSelect();
        this.props.nextQuestionReady(false); // ensure restart
    }

    handleNext() {
        this.props.nextQuestionSelect(this.props.currentStep);
        this.props.nextQuestionReady(false);
    }

    handleAnswer(isCorrect) {
        this.props.selectAnswer(isCorrect);
        this.props.nextQuestionReady();

        this.setState({ isCorrect });
    }

    renderResult(isComplete) {
        if (!isComplete) return null;

        const {
            results,
            score,
            totalSteps
        } = this.props;

        const allScores = Object.keys(results).map(item => parseInt(item, 10));
        const highestScore = Math.max.apply(null, allScores);

        const resultOutput = (score <= highestScore) ? results[score] : results[highestScore];

        return (
            <Splash
                heading={`${resources.result.youScore} ${score} ${resources.result.of} ${totalSteps}`}
                text={resultOutput}
            />
        );
    }

    render() {
        const {
            currentStep,
            totalSteps,
            isNextReady
        } = this.props;

        const isStart = currentStep === 0;
        const isComplete = currentStep === totalSteps + 1;
        const isLastQuestion = currentStep === totalSteps;
        const isGame = !isStart && !isComplete;

        return (
            <div className="container">
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter-desktop">

                        {
                            !isComplete &&
                            <Splash
                                heading={resources.start.heading}
                                text={resources.start.subheading}
                            />
                        }

                        {
                            isGame &&
                            <Progress
                                current={currentStep - 1}
                                total={totalSteps}
                            />
                        }

                        <br/>

                        {this.renderResult(isComplete)}

                        {
                            !isComplete &&
                            <Question
                                step={currentStep}
                                isCorrect={this.state.isCorrect}
                                isNextReady={isNextReady}
                                onAnswer={this.handleAnswer}
                                totalSteps={totalSteps}
                            />
                        }

                        <ActionBar
                            isStart={isStart}
                            isComplete={isComplete}
                            isLastQuestion={isLastQuestion}
                            isNextReady={isNextReady}
                            onStartClick={this.handleStart}
                            onNextClick={this.handleNext}
                            resources={resources.actionBar}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
    isNextReady: PropTypes.bool,

    score: PropTypes.number,

    firstQuestionSelect: PropTypes.func,
    nextQuestionSelect: PropTypes.func,
    selectAnswer: PropTypes.func,
    nextQuestionReady: PropTypes.func,

    results: PropTypes.object
};

const mapDispatchToProps = {
    firstQuestionSelect,
    nextQuestionSelect,
    selectAnswer,
    nextQuestionReady
};

const mapStateToProps = state => {
    const currentStep = state.currentStep;
    const totalSteps = state.questions.length;
    const isNextReady = state.isNextReady;
    const score = state.score;
    const results = state.results;

    return {
        currentStep,
        totalSteps,
        isNextReady,
        score,
        results
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
