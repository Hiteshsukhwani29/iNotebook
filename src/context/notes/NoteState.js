import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const n = [
        {
          "_id": "6208d7afb9471f1d7d837d89",
          "user": "61ffa37b3fb039d6c1ef2185",
          "title": "hhhhhhh",
          "description": "hello world",
          "tag": "general",
          "__v": 0
        },
        {
          "_id": "6208d7b8b9471f1d7d837d8e",
          "user": "61ffa37b3fb039d6c1ef2185",
          "title": "hhhhhhh",
          "description": "hello world",
          "tag": "general",
          "__v": 0
        },
        {
          "_id": "6208d7c5b9471f1d7d837d92",
          "user": "61ffa37b3fb039d6c1ef2185",
          "title": "hhhhhhh",
          "description": "hello world",
          "tag": "general",
          "__v": 0
        },
        {
          "_id": "6208d7ccb9471f1d7d837d94",
          "user": "61ffa37b3fb039d6c1ef2185",
          "title": "hhhhhsdfghh",
          "description": "hello world",
          "tag": "general",
          "__v": 0
        },
        {
          "_id": "6208d7cdb9471f1d7d837d96",
          "user": "61ffa37b3fb039d6c1ef2185",
          "title": "hhhhhsdfghh",
          "description": "hello world",
          "tag": "general",
          "__v": 0
        }
      ]

      const [notes, setnotes] = useState(n);

      const addnote=(title,desc,tag)=>{
        console.log(`working , Working${title}`);
        const note = {
          "_id": "6208d7cdb94213e2r4537d96",
          "user": "61ffa37b3fb056781ef2185",
          "title": title,
          "description":desc,
          "tag":tag
        }
        setnotes(notes.concat(note));
      }

      const deletenote=(id)=>{
        const s=notes.filter((note)=>{return note._id!==id});
        setnotes(s);
      }

    return (
        <NoteContext.Provider value={{notes,addnote,deletenote}}>
            {props.children};
        </NoteContext.Provider>
    )
}

export default NoteState;