import './App.css'
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Routes, Route } from "react-router-dom";
import Footer from './Components/Footer';
import NoteState from './Context/Notes/NoteState';
import { useState } from 'react';
import Alert from './Components/Alert';

function App() {
    const [alertData, setAlertData] = useState({
        type: "",
        message: ""
    })
    const showAlert = (alertType, alertMsg) => {
        setAlertData({
            type: alertType,
            message: alertMsg
        })
        setTimeout(() => {
            setAlertData({
                type: "",
                message: ""
            })
        }, 2000);
    }

    const [user, setUser] = useState({
        name: "",
        email: ""
    })
    const getUserDetails = async () => {
        const getUserURL = `http://localhost:5000/api/auth/getuser`;
        const response = await fetch(getUserURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const userDetails = await response.json();
        setUser(userDetails)
    }

    return (
        <NoteState>
            <div className="App bg-[#111827]">
                <Navbar user={user} />
                <Alert alertData={alertData} />
                <Routes>
                    <Route path="/" element={<HomePage showAlert={showAlert} getUserDetails={getUserDetails} />} />
                    <Route path="/login" element={<Login showAlert={showAlert} />} />
                    <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
                </Routes>
                <Footer />

            </div>
        </NoteState>

    );
}

export default App;
