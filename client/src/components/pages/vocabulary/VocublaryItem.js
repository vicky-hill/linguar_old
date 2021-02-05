import React from 'react';
import { connect } from 'react-redux';
import DelayLink from 'react-delay-link';

const VocabularyItem = ({ title, words }) => {

    const action = () => {
        document.getElementById('slide-vocabulary').classList.add('slide-out-page');
    }

    return (
        <DelayLink delay={300} to={`/vocabulary/${title}`} clickAction={action} replace={false} >
            <div className="vocabulary-list_item">

                {/* <img className="vocabulary-list_item--art hide-mobile" src={chapterArt01} alt="" /> */}

                <div className="vocabulary-list_item--text">
                    <h3>{title}</h3>
                    <p>{words.words.filter(word => word.list.title === title).length} Words</p>
                </div>


                <div className="vocabulary-list_item--chevron">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        </DelayLink>
    )
}


const mapStateToProps = state => ({
    words: state.words
})

export default connect(mapStateToProps)(VocabularyItem);




