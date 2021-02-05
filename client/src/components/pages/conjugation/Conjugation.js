import React from 'react';
import { Link } from 'react-router-dom';

const Conjugation = () => {
    return (
        <div className="container">
            <div className="scroll-container">
                <div className="stitched-box conjugation">
                    <h3 className="conjugation-title">Conjugation coming soon!</h3>
                    <Link to='/vocabulary' ><button className="btn mt-7">Go to Vocabulary</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Conjugation;