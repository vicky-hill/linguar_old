import React, { useEffect } from 'react';
import VocabularyHeading from './VocabularyHeading';
import VocabularyItem from './VocublaryItem';
import WordListItem from '../wordList/WordListItem';
import { connect } from 'react-redux';
import { getWords, getLists, setURL } from '../../../actions/words';
import EditForm from '../../layout/EditForm';


const Vocabulary = ({ lists, getWords, getLists, setURL, searchTerm, words, match }) => {

    useEffect(() => {
        getWords();
        getLists();
        setURL();
    }, [getWords, getLists, setURL])


    // Slide down form when clicking outside of form
    const slideDownForm = (e) => {
        const slideForm = document.getElementById('slide-form');
        slideForm.classList.remove('slide-in');
    }

    return (
        <div id="slide-vocabulary" className="container">
            <div className="scroll-container">
                <VocabularyHeading />

                {/* Vocabulary List */}

                {
                    searchTerm === '' ? 
                        ( 
                            <div id="vocabulary-list" className="vocabulary-list">
                                {
                                    lists.map(list => (
                                        <VocabularyItem key={list._id} title={list.title} />
                                    ))
                                }
                            </div>
                        ) : 
                        (
                            <div className="word-list">
                            {
                                words
                                    .filter(word => word.english.includes(searchTerm) || word.spanish.includes(searchTerm))
                                    .map(word => (
                                        <WordListItem key={word._id} word={word} />
                                    ))
                            }
                            </div>
                        ) 
                }       


            </div>


            <div className="container slide-container" id="full-screen-form">
                    <EditForm listTitle={match.params.title} listId={lists.filter(list => list.title === match.params.title)[0]} />
                </div>
        </div>



    )
}

const mapStateToProps = state => ({
    lists: state.words.lists,
    searchTerm: state.words.searchTerm,
    words: state.words.words
})

export default connect(mapStateToProps, { getLists, getWords, setURL })(Vocabulary);
