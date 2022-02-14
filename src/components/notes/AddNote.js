import { WrapText } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import NoteContext from '../../context/notes/NoteContext';

function AddNote() {

    const context = useContext(NoteContext);
    const {addnote} = context;

    const [note,setnote] = useState({title:"",desc:"",tag:"general"});

    const savenote=(e)=>{
        e.preventDefault();
        addnote(note.title,note.desc,note.tag);
    }

    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <h2>Add Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onchange} name="title"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea type="text" className="form-control text-wrap" style={{height:"150px"}} onChange={onchange} name="desc" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={savenote}>Save</button>
            </form>
        </div>
    )
}

export default AddNote