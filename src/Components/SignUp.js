import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp(props) {
    const navigate = useNavigate()
    const { showAlert } = props
    const [signUpCred, setSignUpCred] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSignUp = async (e) => {
        e.preventDefault();
        let signUpURL = `http://localhost:5000/api/auth/createUser`
        const response = await fetch(signUpURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpCred),
        })
        const signUp = await response.json();
        if (signUp.success) {
            localStorage.setItem("token", signUp.token)
            navigate("/")
            showAlert('green', 'Account Created Successfully')
        }
        else {
            showAlert('red', signUp.error)

        }
    }
    const onChange = async (e) => {
        setSignUpCred({ ...signUpCred, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handleSignUp}>
                <section className="text-gray-600 body-font bg-[#111827]">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

                        <div className="lg:w-2/6 md:w-1/2 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0  bg-[#1E2837]">
                            <h2 className="text-white text-2xl font-bold title-font mb-5 text-center">Sign Up</h2>
                            <div className="relative mb-4">
                                <label htmlFor="name" className="leading-7 text-sm text-white">Full Name</label>
                                <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} value={signUpCred.name} minLength={3} required />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" required className="leading-7 text-sm text-white">Email</label>
                                <input type="text" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} value={signUpCred.email} required />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                                <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange} value={signUpCred.password} minLength={3} required />
                            </div>
                            <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2.5 px-5 w-full mt-4">Sign Up</button>
                            <p className="text-base text-white text-center mt-4">Already have an account?  <Link to='/login'><span className="text-[#1A56DB] font-semibold">Login here.</span></Link></p>
                        </div>
                    </div>
                </section>
            </form>
        </>
    )
}

export default SignUp