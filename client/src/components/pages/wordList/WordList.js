import React, { Fragment, useEffect } from 'react';
import { Route } from 'react-router-dom';
import WordListHeading from './WordListHeading';
import WordListItem from './WordListItem';
import { connect } from 'react-redux';
import { setURL, getWords, getLists, clearEdit, openEdit } from '../../../actions/words';
import EditForm from '../../layout/EditForm';

const WordList = ({ match, words: { words, lists }, setURL, getWords, getLists, clearEdit, openEdit }) => {
    useEffect(() => {
        setURL();
        getWords();
        getLists();
        document.getElementById('slide-wordlist').classList.add('slide-in-page');
    }, [getLists, getWords, setURL])



    // Slide up form to add words
    const slideUpForm = () => {
        document.getElementById('full-screen-form').classList.add('slide-in');
        openEdit('createWord');
    }

    // Slide down form when clicking outside of form
    const slideDownForm = (e) => {
        if (e.target.classList.contains('container')) {

            // Slide Form container down
            document.getElementById('slide-form').classList.remove('slide-in');

            // Clear form data
            clearEdit();
        }
    }


    return (
        <Fragment>

            <div id="slide-wordlist" className="container pre-slide-in-page">
                <div className="scroll-container">
                    <WordListHeading
                        title={match.params.title}
                        count={words.filter(word => word.list.title === match.params.title).length}
                        id={lists.filter(list => list.title === match.params.title)[0]}
                    />

                    <div className="word-list">
                        {
                            words
                                .filter(word => word.list.title === match.params.title)
                                .map(word => (
                                    <WordListItem key={word._id} word={word} />
                                ))
                        }

                    </div>
                </div>



                <div className="container slide-container" id="full-screen-form">
                    <Route render={({ history }) => <EditForm history={history} listTitle={match.params.title} listId={lists.filter(list => list.title === match.params.title)[0]} />} />
                    {/* <EditForm listTitle={match.params.title} listId={lists.filter(list => list.title === match.params.title)[0]} /> */}
                </div>

            </div>




        </Fragment>
    )
}


const mapStateToProps = state => ({
    words: state.words
})

export default connect(mapStateToProps, { setURL, getWords, getLists, clearEdit, openEdit })(WordList);