import React from 'react'
import logo from "../images/logo.svg"
function Footer() {
    return (
        <>
            <footer className="text-gray-600 body-font bg-[#1E2837]">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <span className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="ml-3 text-xl text-white">NoteSaver</span>
                    </span>
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2022 NoteSaver
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

                        <span className="ml-3 text-gray-500">
                            <a href='https://www.instagram.com/yashvardhan_jadhav/?hl=en' target='_blank' rel="noreferrer">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                        </span>
                        <span className="ml-3 text-gray-500">
                            <a href='https://www.linkedin.com/in/yashvardhan-jadhav-319621200' target='_blank' rel="noreferrer">

                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </span>
                    </span>
                </div>
            </footer>
        </>
    )
}

export default Footer