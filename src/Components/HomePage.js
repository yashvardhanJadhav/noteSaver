import React, { useEffect } from 'react'
import TextField from './TextField'


function HomePage(props) {
    const { showAlert, getUserDetails } = props
    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <TextField showAlert={showAlert} />
        </>
    )
}

export default HomePage