import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const n = []

  const [notes, setnotes] = useState(n);

  const fetchallnotes = async () => {
    const response = await fetch("http://localhost:4000/api/notes/fetchallnotes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmEzN2IzZmIwMzlkNmMxZWYyMTg1In0sImlhdCI6MTY0NDE0MzQ4M30.S14ujB8prpCtNkINvsGMS7H5xK9IMudP-mietHgbUSo"
      },
    });
    const r = await response.json();
    console.log(r);
    setnotes(r[0]);
  }

  const addnote = async(title, desc, tag) => {
    const response = await fetch("http://localhost:4000/api/notes/addnote", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmEzN2IzZmIwMzlkNmMxZWYyMTg1In0sImlhdCI6MTY0NDE0MzQ4M30.S14ujB8prpCtNkINvsGMS7H5xK9IMudP-mietHgbUSo"
      },
      body: JSON.stringify({title,description:desc,tag:"general"})
    });
    const r = await response.json();
    setnotes(notes.concat(r));
  }

  const deletenote = async (id) => {
    const response = await fetch(`http://localhost:4000/api/notes/deletenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZmEzN2IzZmIwMzlkNmMxZWYyMTg1In0sImlhdCI6MTY0NDE0MzQ4M30.S14ujB8prpCtNkINvsGMS7H5xK9IMudP-mietHgbUSo"
      }
    }).then((response) => console.log(response.json()));
    setnotes(response);
    const s = notes.filter((note) => { return note._id !== id });
    setnotes(s);
  }

  const editnote = (id, title, desc, tag) => {
    for (let i = 0; i < notes.length; i++) {
      const e = notes[i];
      if (e._id === id) {
        e.title = title;
        e.description = desc;
        e.tag = tag;
      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, fetchallnotes }}>
      {props.children};
    </NoteContext.Provider>
  )
}

export default NoteState;