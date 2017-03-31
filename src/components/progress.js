import React, { PropTypes } from 'react';

const Progress = ({ current, total }) => (
    <section className="trivia-progress">
        <progress
            className="progress is-primary"
            value={current}
            max={total}
        />        
    </section>
);

Progress.propTypes = {
    current: PropTypes.number,
    total: PropTypes.number
};

export default Progress;
