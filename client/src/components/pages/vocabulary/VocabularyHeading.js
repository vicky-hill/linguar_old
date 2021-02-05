import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { openEdit } from '../../../actions/words';
import { clearEdit, saveList, getSearchTerm } from '../../../actions/words';


const VocabularyHeading = ({ count, openEdit, saveList, searchTerm, getSearchTerm }) => {

    // Open and close inline add list form
    const toggleForm = () => {
        document.getElementById('desktop-add-form').classList.toggle('show-edit-form');
        openEdit('createList');
        setList('');
    }

    /* ===================================
       LIST EDIT
    =================================== */

    // useState [Add List]
    const [list, setList] = useState('');

    // Handle onChange list edits
    const onListChange = (e) => {
        setList(e.target.value);
    }


    // Handle onSubmit list edits
    const onListSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (list === '') {
            console.log('Fill out all fields');
        }

        saveList({
            title: list.trim()
        });

        // Slide form down after saving list
        setTimeout(() => {
            toggleForm();
            setList('');
        }, 300);

    }



    /* ===================================
       SEARCH VOCABULARY
    =================================== */

    // useState [Search vocabulary]
    const [searchForm, setSearchForm] = useState(searchTerm);

    // Handle onChange search vocabulary
    const onSearchChange = (e) => {
        getSearchTerm(e.target.value);
        setSearchForm(searchTerm);
    }



    return (

        <Fragment>

            {/* Add New List */}
            <div className="stitched-box hide-mobile edit-form" id="desktop-add-form">
                <div className="form-container">
                    <h1 className="form-heading">Add new list:</h1>
                    <form onSubmit={onListSubmit}>
                        <input autoComplete="off" autoCapitalize="none" type="text" placeholder="List Name" value={list} onChange={onListChange} />
                        <button type="submit">Save list</button>
                    </form>
                </div>
                <i onClick={toggleForm} className="fas fa-times edit-form--close"></i>
            </div>

            {/* Grey Header Box */}
            <div className="heading_grey-box">
                <div className="heading_grey-box--desktop">

                    <div className="heading_grey-box_group">
                        <h1 className="heading_grey-box_title">{count} Words</h1>
                        <button className="transparent-btn" onClick={toggleForm}><p>+</p> Add new list</button>
                    </div>
                    <form action="">
                        <i className="fas fa-search input-icon"></i>
                        <input className="heading_grey-box_input rounded-input" type="text" placeholder="Search Vocabulary" value={searchTerm} onChange={onSearchChange} />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    count: state.words.count,
    searchTerm: state.words.searchTerm
})

export default connect(mapStateToProps, { openEdit, saveList, clearEdit, getSearchTerm })(VocabularyHeading);
