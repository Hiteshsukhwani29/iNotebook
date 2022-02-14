import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever'

function NoteItem({ title,description }) {
    return (
        <div className='col-md-4 p-1'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted" style={{fontSize:"10px"}}>Card subtitle</h6>
                    <p className="card-text">{description}</p>
                    <div className='position-absolute top-0 end-0 p-2 text-muted'>
                    <EditIcon />
                    </div>
                    <div className='position-absolute bottom-0 end-0 p-2 text-muted'>
                    <DeleteIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem