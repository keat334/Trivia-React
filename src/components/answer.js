import React, { Component, PropTypes } from 'react';

import cls from 'classnames';

class Answer extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isAnswered: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children !== this.props.children) {
            this.setState({
                isAnswered: false
            });
        }
    }

    handleClick(e) {
        if (this.props.isDisabled) return false;

        this.setState({
            isAnswered: true
        });

        return this.props.onClick(this.props.isCorrect, e);
    }

    render() {
        return (
            <div className="trivia-answer" onClick={this.handleClick}>
                <div className={cls('box', {
                    'is-disabled': this.props.isDisabled
                })}>
                    <div className="is-block has-text-left">
                        {this.props.children}

                        {
                            this.state.isAnswered &&
                            <div>
                                <strong>
                                    {
                                        this.props.isCorrect ?
                                            <i className="fa fa-check" /> :
                                            <i className="fa fa-times" />
                                    }
                                </strong>
                                &nbsp;
                                <em>
                                    {this.props.hint}
                                </em>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Answer.propTypes = {
    children: PropTypes.node,
    hint: PropTypes.node,
    isCorrect: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default Answer;
