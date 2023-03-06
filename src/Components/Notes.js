import { React, useContext, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

function Notes(props) {
    const { _id, title, description, tag } = props
    const { deleteNote, editNote } = useContext(NoteContext)
    const [note, setNote] = useState({
        id: _id,
        title: title,
        description: description,
        tag: tag
    })
    const deleteHandleClick = () => {
        deleteNote(_id)
        props.showAlert("green", "Note Deleted Successfully")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    const editHandleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.title, note.description, note.tag);
        props.showAlert("green", "Note Edited Successfully")

    }
    return (
        <>
            <div className="p-4 lg:w-1/3 w-full">
                <div className="h-full bg-[#1E2837] bg-opacity-75 px-8 pt-8 pb-8 rounded-lg overflow-hidden  relative">
                    <h2 className="tracking-widest text-xs title-font font-medium text-blue-700 mb-1 text-center">{tag}</h2>
                    <h1 className="title-font sm:text-2xl text-xl font-bold text-white mb-3 text-center">{title}</h1>
                    <p className="leading-relaxed mb-3 text-base text-white">{description}</p>
                    <div className="flex justify-center mt-8 gap-x-3">
                        <i className="fa-solid fa-eye fa-xl"></i>
                        <i className="fa-solid fa-trash-can fa-xl" onClick={deleteHandleClick}></i>
                        <i className="fa-solid fa-square-pen fa-xl" data-bs-toggle="modal" data-bs-target={`#id${note.id}`}></i>
                    </div>
                </div>
            </div>


            {/* MODAL */}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id={`id${note.id}`} tabIndex="-1" aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md bg-[#111827]">
                            <h5 className="text-xl font-medium leading-normal text-white" id="exampleModalXlLabel">
                                Edit Note
                            </h5>
                            <i className="fa-solid fa-xmark"
                                data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div className="modal-body relative bg-[#1E2837]">

                            <div className="container my-24 mx-auto px-5">
                                <div className="rounded-lg sm:p-4 p-4 flex flex-col md:m-auto  mt-10 md:mt-0 bg-[#1E2837]">

                                    <div className="mx-auto w-full">
                                        <div className="sm:px-4 sm:pb-4 flex flex-wrap -m-2">
                                            <div className="p-2 w-1/2">
                                                <div className="relative">
                                                    <label htmlFor="title" className="leading-7 text-sm text-white">Title</label>
                                                    <input type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={note.title} onChange={onChange} />
                                                </div>
                                            </div>
                                            <div className="p-2 w-1/2">
                                                <div className="relative">
                                                    <label htmlFor="tag" className="leading-7 text-sm text-white">Tag</label>
                                                    <input type="text" id="tag" name="tag" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={note.tag} onChange={onChange} />
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label htmlFor="description" className="leading-7 text-sm text-white">Description</label>
                                                    <textarea id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out h-32" value={note.description} onChange={onChange}></textarea>
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <button disabled={note.title.length < 5 || note.description.length < 5} className="flex mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2.5 px-5" onClick={editHandleClick} data-bs-dismiss="modal" aria-label="Close" >Edit Note</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        </>
    )
}

export default Notes