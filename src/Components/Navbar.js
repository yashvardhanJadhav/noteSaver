import React from 'react'
import logo from "../images/logo.svg"
import { Link, useNavigate } from "react-router-dom";
import './text.css'

function Navbar(props) {
    const token = localStorage.getItem('token')
    const { user } = props
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const capFirstLetter = (word) => {
        if (word === '') {
            return 'user'
        }
        else {
            const firstLetter = word[0].toUpperCase()
            word = word.substring(1)
            const final = firstLetter.concat(word)
            return final
        }
    }


    return (
        <>
            <header className="sticky top-0 z-50">
                <nav className="bg-[#1F2937] border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
                    <div className="container flex flex-wrap justify-between items-center mx-auto">
                        <Link to='/' className="flex items-center">
                            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <span className="self-center text-2xl whitespace-nowrap text-white font-bold">NoteSaver</span>
                        </Link>
                        <div className="flex md:order-2 sm:gap-x-4">




                            {

                                !token ? (
                                    <>
                                        <Link to='/login'><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button></Link>
                                        <Link to='/signup'><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center sm:mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button></Link>
                                    </>
                                ) : (
                                    <>

                                        <div className="flex justify-center">
                                            <div>
                                                <div className="dropdown relative">
                                                    <i className="fa-solid fa-circle-user self-center fa-xl iconColor text-[#5288dc] py-2.5" type="button"
                                                        id="dropdownMenuButton2"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"></i>

                                                    <ul
                                                        className="dropdown-menu min-w-max absolute  text-base z-50 float-left pt-4 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-gray-800"
                                                        aria-labelledby="dropdownMenuButton2"
                                                    >
                                                        <h6
                                                            className="text-gray-400 font-semibold text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent text-center"
                                                        >
                                                            {capFirstLetter(user.name)}
                                                        </h6>
                                                        <h6
                                                            className="text-gray-400 font-semibold text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent"
                                                        >
                                                            {user.email}
                                                        </h6>


                                                        <li>
                                                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center sm:mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Log Out</button>

                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="self-center text-sm whitespace-nowrap text-white font-bold dispnone">Hi, {capFirstLetter(user.name)}</span>
                                    </>

                                )

                            }
                        </div>

                    </div>
                </nav>
            </header>

            {/* MODAL FOR LOGOUT */}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenter" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md bg-[#111827]">
                            <h5 className="text-xl font-medium leading-normal text-white" id="exampleModalXlLabel">
                                Are you want to Log Out
                            </h5>
                            <i className="fa-solid fa-xmark text-[#4B5563]"
                                data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>

                        <div
                            className="modal-footer flex flex-shrink-0 flex-wrap justify-end p-4 border-gray-200 rounded-b-md bg-[#1e2837] items-center">
                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2.5 px-5" data-bs-dismiss="modal" aria-label="Close" onClick={handleLogOut}>Log Out</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar