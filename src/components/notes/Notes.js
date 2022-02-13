import React,{ useContext } from 'react';
import NoteContext from '../../context/notes/NoteContext';

function Notes() {

    const context = useContext(NoteContext);
    const {notes, setnotes} = context; 

    return (
        <div>
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return note.title;
            })}
        </div>
    )
}

export default Notes