import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
    const navigate = useNavigate()
    const { showAlert } = props
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleClick = async (e) => {
        e.preventDefault();
        let loginURL = `http://localhost:5000/api/auth/login`
        const response = await fetch(loginURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials),
        })
        const login = await response.json();
        if (login.success) {
            localStorage.setItem("token", login.token)
            navigate("/")
            showAlert('green', 'Logged In Successfully')
        }
        else {
            showAlert('red',login.error)
        }
    }

    return (
        <>
            <form onSubmit={handleClick}>
                <section className="text-gray-600 body-font bg-[#111827]">
                    <div className="container px-5 py-32 mx-auto flex flex-wrap items-center">

                        <div className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0 bg-[#1E2837]">
                            <h2 className="text-white text-2xl font-bold title-font mb-5 text-center">Login</h2>

                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-white">Email</label>
                                <input type="text" pattern='[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}' id="email" name="email" value={credentials.email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} required />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                                <input type="password" id="password" name="password" value={credentials.password} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} required minLength={3} />
                            </div>
                            <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2.5 px-5 w-full mt-4">Login</button>
                            <p className="text-base text-white text-center mt-4">Not registered? <Link to='/signup'><span className="text-[#1A56DB] font-semibold">Create an account.</span></Link></p>
                        </div>
                    </div>
                </section>
            </form>
        </>
    )
}

export default Login