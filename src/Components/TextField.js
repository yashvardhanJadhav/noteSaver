import { React, useContext, useState, useEffect } from 'react'
import Notes from './Notes'
import NoteContext from '../Context/Notes/NoteContext'
import { useNavigate } from 'react-router-dom'

function TextField(props) {
    const { showAlert } = props

    const data = useContext(NoteContext)
    const { notes, addNote, fetchAllNotes } = data;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("green", "Note Added Successfully")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
   

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchAllNotes()
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <> <form onSubmit={handleClick}>
            <section className="text-gray-600 body-font relative bg-[#111827]">
                <div className="container my-24 mx-auto px-5">
                    <div className="rounded-lg sm:p-4 p-4 flex flex-col md:m-auto sm:w-1/2 mt-10 md:mt-0 bg-[#1E2837]">
                        <div className="flex flex-col pt-4 text-center mx-auto mb-8">
                            <h1 className="sm:text-4xl text-2xl font-medium title-font mb-4 text-white">Add a Note</h1>
                        </div>
                        <div className="mx-auto">
                            <div className="sm:px-4 sm:pb-4 flex flex-wrap -m-2">
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="title" className="leading-7 text-sm text-white">Title</label>
                                        <input type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} minLength={2} required />
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="tag" className="leading-7 text-sm text-white">Tag</label>
                                        <input type="text" id="tag" name="tag" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label htmlFor="description" className="leading-7 text-sm text-white">Description</label>
                                        <textarea id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-32" onChange={onChange} minLength={5} required></textarea>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button className="flex mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2.5 px-5">Add Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>

            <section className="text-gray-600 body-font bg-[#111827]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-4xl text-2xl font-medium title-font mb-4 text-white">All Notes</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {
                         notes.length === 0 ? 
                            <div className='mx-auto'>
                             <h4 className="sm:text-xl text-lg font-normal title-font mb-4 text-white">No Notes to Display</h4>
                            </div>
                         :
                            notes.map((note) => {
                                return <Notes key={note._id} title={note.title} description={note.description} tag={note.tag} _id={note._id} showAlert={showAlert} />
                            })
                        }
                    </div>
                </div>
            </section>


        </>
    )
}

export default TextField