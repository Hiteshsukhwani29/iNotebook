import React, { useContext } from 'react';
import NoteContext from '../../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {

    const context = useContext(NoteContext);
    const { notes, setnotes } = context;

    return (
        <>
            <div className='home-addnote container my-3'>
                <AddNote />
            </div>
            <div className='container'>
                <h2>Your Notes</h2>
                <div className='row'>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} title={note.title} description={note.description} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes