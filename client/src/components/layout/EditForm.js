import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { saveWord, updateWord, clearEdit, saveList, updateList } from '../../actions/words';
 
const EditForm = ({ history, foreignLanguage, nativeLanguage, listTitle, listId, saveWord, englishState, spanishState, wordIdState, listTitleState, listIdState, editMode, updateWord, clearEdit, saveList, updateList }) => {

    function closeForm() {
        // Slide Form container down
        document.getElementById('full-screen-form').classList.remove('slide-in');

        // Clear form data
        clearEdit();

    }

    // useState [Add Word]
    const [formDataWord, setFormDataWord] = useState({
        spanish: englishState,
        english: spanishState
    })

    const { spanish, english } = formDataWord;

    // useState [Add List]
    const [formDataList, setFormDataList] = useState(listTitleState);


    // Load Word & List edit data from state
    useEffect(() => {
        setFormDataWord({
            spanish: spanishState,
            english: englishState
        });

        setFormDataList(listTitleState);
    }, [editMode, spanishState, englishState, listTitleState])


    /* ==========================================
       onChange
    ========================================== */

    // Handle onChange word edits 
    const onWordChange = (e) => {

        setFormDataWord({
            ...formDataWord,
            [e.target.name]: e.target.value
        })
    }

    // Handle onChange list edits
    const onListChange = (e) => {
        setFormDataList(e.target.value);
    }


    /* ==========================================
       onSubmit
    ========================================== */

    // ###### Handle onSubmit word edits ########

    const onWordSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (spanish === '' || english === '') {
            console.log('Fill out all fields');
        }

        // Create a new word
        if (editMode === 'createWord') {
            saveWord({
                spanish: spanish.trim(),
                english: english.trim(),
                list: listId._id
            });

            // Clear out form after saving word
            setTimeout(() => {
                document.getElementById('spanish').focus();
                setFormDataWord({
                    spanish: '',
                    english: ''
                })
            }, 300);
        }

        // Edit existing word
        if (editMode === 'editWord') {
            updateWord(wordIdState, {
                spanish: spanish.trim(),
                english: english.trim()
            });

            // Slide form down after editing word
            setTimeout(() => {
                document.getElementById('full-screen-form').classList.remove('slide-in');
                clearEdit();
            }, 300);
        }
    }


    // ######## Handle onSubmit list edits ###########

    const onListSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (formDataList === '') {
            console.log('Fill out all fields');
        }

        // Create a new list
        if (editMode === 'createList') {
            saveList({
                title: formDataList.trim()
            });

            // Slide form down after saving list
            setTimeout(() => {
                document.getElementById('full-screen-form').classList.remove('slide-in');
                clearEdit();
            }, 300);


        }

        // Edit existing list
        if (editMode === 'editList') {
            updateList(listIdState, { title: formDataList.trim() });
            const title = formDataList.trim();

            // Slide form down after editing list
            setTimeout(() => {
                document.getElementById('full-screen-form').classList.remove('slide-in');
                clearEdit();
                history.push(`/vocabulary/${title}`);
            }, 300);
        }
    }

    // Form for creating/editing words
    const wordForm = (
        <Fragment>
            <h1 className="form-heading">{editMode === 'editWord' ? 'Update word:' : listTitle}</h1>
            <form onSubmit={onWordSubmit}>
                <input placeholder="Foreign" autoComplete="off" autoCapitalize="none" id="spanish" type="text" name="spanish" value={spanish} onChange={onWordChange} />
                <input placeholder="Native" autoComplete="off" autoCapitalize="none" type="text"  name="english" value={english} onChange={onWordChange} />
                <button type="submit">{editMode === 'editWord' ? 'Update word' : 'Add word'}</button>
            </form>
        </Fragment>
    )




    // Form for creating/editing lists
    const listForm = (
        <Fragment>
            <h1 className="form-heading">{editMode === 'editList' ? 'Update list name:' : 'Add a new list:'}</h1>
            <form onSubmit={onListSubmit} >
                <input autoComplete="off" autoCapitalize="none" type="text" placeholder="List Name" value={formDataList} onChange={onListChange} />
                <button type="submit">{editMode === 'editList' ? 'Update list' : 'Add list'}</button>
            </form>
        </Fragment>
    )

    return (
        <div className="scroll-container">
        <div className="stitched-box edit-form full-screen">
            <div className="form-container">

                {
                    editMode === 'createWord' || editMode === 'editWord' ? wordForm : listForm
                }

            </div>
            <i className="fas fa-times edit-form--close full-screen--close" onClick={closeForm}></i>
        </div>
        </div>
    )
}


const mapStateToProps = state => ({
    editMode: state.words.editMode,
    foreignLanguage: state.auth.user.foreignLanguage,
    nativeLanguage: state.auth.user.nativeLanguage,

    // Word State
    spanishState: state.words.editWord.spanish,
    englishState: state.words.editWord.english,
    wordIdState: state.words.editWord._id,

    // List State
    listTitleState: state.words.editList.listTitle,
    listIdState: state.words.editList.listId

})

export default connect(mapStateToProps, { saveWord, updateWord, clearEdit, saveList, updateList })(EditForm);