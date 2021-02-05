import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { openEdit, saveWord, deleteList } from '../../../actions/words';


const WordListHeading = ({ languages, title, id, count, openEdit, saveWord, deleteList }) => {

    // useState [Add Word]
    const [word, setWord] = useState({
        spanish: '',
        english: ''
    })

    const { spanish, english } = word;


    // Handle onChange word edits 
    const onWordChange = (e) => {

        setWord({
            ...word,
            [e.target.name]: e.target.value
        })

    }


    // Handle onSubmit word edits 

    const onWordSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (spanish === '' || english === '') {
            console.log('Fill out all fields');
        }

        // Create a new word

        saveWord({
            spanish: spanish.trim(),
            english: english.trim(),
            list: id
        });

        // Clear out form after saving word
        setTimeout(() => {
            document.getElementById('spanish').focus();
            setWord({
                spanish: '',
                english: ''
            })
        }, 300);
    }




    const toggleOptions = (e) => {
        e.target.parentElement.nextSibling.classList.toggle('hide-mobile');
        e.target.parentElement.nextSibling.nextSibling.classList.toggle('show-edits');
        console.log(e.target.parentElement.nextSibling);
    }



    // Open and close inline add list form
    const toggleForm = () => {
        document.getElementById('desktop-add-form').classList.toggle('show-edit-form');
        openEdit('createList');
    }


    const onEdit = () => {
        openEdit('editList', { listTitle: title, listId: id._id });

        // Slide up edit form
        document.getElementById('full-screen-form').classList.add('slide-in');
    }

    const onDelete = () => {
        let response = window.confirm('Delete that list?');

        if(response) {
            deleteList(id._id);
            console.log(id);
        }
    }


    return (

        <Fragment >

            {/* Add New Word */}
            <div className="stitched-box edit-form" id="desktop-add-form" >
                <div className="form-container">
                    <h1 className="form-heading">Add new word:</h1>
                    <form onSubmit={onWordSubmit}>
                        <input autoComplete="off" autoCapitalize="none" id="spanish" type="text" placeholder={languages[1]} name="spanish" value={spanish} onChange={onWordChange} />
                        <input autoComplete="off" autoCapitalize="none" type="text" placeholder={languages[0]} name="english" value={english} onChange={onWordChange} />
                        <button className="mt-4" type="submit">Save word</button>
                    </form>
                </div>
                <i className="fas fa-times edit-form--close" onClick={toggleForm}></i>
            </ div>


            {/* WordList Heading */}
            <div className="heading_grey-box wordlist-header_grey-box" >
                <div className="heading_grey-box--desktop wordlist-header--desktop">

                    <div className="heading_grey-box_group wordlist-header_group">
                        <h1 className="heading_grey-box_title small" onClick={toggleOptions}>
                            {title}
                            <div className="ml-3 word-list_item--edits hide-mobile">
                                <i className="far fa-edit" onClick={onEdit}></i>
                                <i className="far fa-trash-alt" onClick={onDelete}></i>
                            </div>

                        </h1>
                        <button className="transparent-btn hide-mobile" onClick={toggleForm}><p>+</p> Add new word</button>
                    </div>

                    <p className="heading_grey-box_subtitle">{count} Words</p>

                    <div className="ml-2 word-list_item--edits hide-desktop">
                        <i className="far fa-edit" onClick={onEdit}></i>
                        <i className="far fa-trash-alt" onClick={onDelete}></i>
                    </div>
                    <button className="transparent-btn hide-desktop wordlist-header_add-button" onClick={toggleForm}><p>+</p> Add new word</button>

                    {/* Add edit options */}

                    {/* <div className="word-list-heading_options">
                        <p className="word-list-heading_edit" onClick={onEdit} >EDIT</p>
                        <p className="word-list-heading_delete">DELETE</p>
                     </div> */}

                </div>
            </div >

        </Fragment>
    )
}

const mapStateToProps = state => ({
    languages: state.auth.user.languages
})

export default connect(mapStateToProps, { openEdit, saveWord, deleteList })(WordListHeading);



