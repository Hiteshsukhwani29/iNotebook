import React, { useContext } from 'react';
import NoteContext from '../../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {

    const context = useContext(NoteContext);
    const { notes, setnotes } = context;

    return (
        <div className='container'>
            <h2>Your Notes</h2>
            <div className='row'>
                {notes.map((note) => {
                    return <NoteItem title={note.title} description={note.description} />
                })}
            </div>
        </div>
    )
}

export default Notes