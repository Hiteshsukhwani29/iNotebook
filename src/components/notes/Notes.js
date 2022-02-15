import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {

    const context = useContext(NoteContext);
    const { notes, fetchallnotes, editnote } = context;

    useEffect(() => {
        fetchallnotes();
    }, []);

    const [note, setnote] = useState({ id: "", modal_title: "", modal_desc: "", modal_tag: "" });


    const updateNote = (c_title, c_description, c_tag, c_id) => {
        ref.current.click();
        setnote({ modal_title: c_title, modal_desc: c_description, modal_tag: c_tag, id: c_id })
    }

    const modalsavenote = (e) => {
        editnote(note.id, note.modal_title, note.modal_desc, note.modal_tag);
        console.log(note);
        refclose.current.click();
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    const ref = useRef(null);
    const refclose = useRef(null);

    return (
        <>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form className='my-3'>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" onChange={onchange} value={note.modal_title} name="modal_title" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea type="text" className="form-control text-wrap" value={note.modal_desc} style={{ height: "60px" }} onChange={onchange} name="modal_desc" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.modal_tag} onChange={onchange} name="modal_tag" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={modalsavenote}>Save changes</button>
                                <button type="button" class="btn btn-secondary d-none" ref={refclose} data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='home-addnote container my-3'>
                <AddNote />
            </div>
            <div className='container'>
                <h2>Your Notes</h2>
                <div className='row'>
                    {notes?.map((note) => {
                        return <NoteItem key={note._id} id={note._id} tag={note.tag} title={note.title} updateNote={updateNote} description={note.description} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes