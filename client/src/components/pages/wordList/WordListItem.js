import React from 'react';
import { connect } from 'react-redux';
import { openEdit, deleteWord } from '../../../actions/words';

const WordListItem = ({ word: { english, spanish, _id }, openEdit, deleteWord }) => {

    const toggleOptions = (e) => {

        let toggleElement;

        if (e.target.tagName === 'P' || e.target.tagName === 'H3') {
            toggleElement = e.target.parentElement.parentElement;
        } else {
            toggleElement = e.target;
        }

        const listItems = document.querySelectorAll('.word-list_item');

        listItems.forEach(item => {
            if (item.classList.contains('show-edits') && !item.classList.contains(toggleElement.classList[1])) {
                item.classList.remove('show-edits');
            }
        })

        if (e.target.tagName === 'P' || e.target.tagName === 'H3') {
            e.target.parentElement.parentElement.classList.toggle('show-edits');
        } else {
            e.target.classList.toggle('show-edits');
        }
    }

    const onEdit = () => {

        // Load words into editMode
        openEdit('editWord', {
            spanish,
            english,
            _id
        });

        // Slide up edit form
        document.getElementById('full-screen-form').classList.add('slide-in');
    }

    const onDelete = () => {
        let response = window.confirm('Delete that word?');

        if(response) {
            deleteWord(_id);
        }
   
    }


    return (

        <div className={`word-list_item ${_id}`} onClick={toggleOptions}>

            <div className="word-list_item--text">
                <h3>{spanish}</h3>
                <p>{english}</p>
            </div>

            <div className="word-list_item--edits">
                <i className="far fa-edit" onClick={onEdit}></i>
                <i className="far fa-trash-alt" onClick={onDelete}></i>
            </div>
        
        </div>
    )
}


export default connect(null, { openEdit, deleteWord })(WordListItem);

