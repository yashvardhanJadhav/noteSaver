import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {

    const fetchAllNotes = async () => {
        let fetchURL = `http://localhost:5000/api/notes/fetchallnotes`;
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setNotes(json)
    }
    // CREATE A NOTE
    const addNote = async (title, description, tag) => {
        let addNoteURL = `http://localhost:5000/api/notes/createNote`
        const data = {
            "title": title,
            "description": description,
            "tag": tag
        }
        const response = await fetch(addNoteURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        })
        const note = await response.json();
        setNotes(note)


        setNotes(notes.concat(note))
    }

    // DELETE A NOTE`
    const deleteNote = async (id) => {
        let deleteURL = `http://localhost:5000/api/notes/deleteNote/${id}`;
        const response = await fetch(deleteURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const note = await response.json();
        setNotes(note)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    // EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
        let editURL = `http://localhost:5000/api/notes/updateNote/${id}`
        const data = {
            "title": title,
            "description": description,
            "tag": tag
        }
        const response = await fetch(editURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        })
        const note = await response.json();

        const newNote = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < notes.length; i++) {
            if (newNote[i]._id === note._id) {
                newNote[i].title = note.title;
                newNote[i].description = note.description;
                newNote[i].tag = note.tag;
                break;

            }
        }
        setNotes(newNote)
    }


    const [notes, setNotes] = useState([])
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;