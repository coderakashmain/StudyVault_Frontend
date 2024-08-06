import React, { useState, useEffect } from 'react'
import './ResetPassword.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';



const ResetPassword = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};
    const [resetPassword, setResetPassword] = useState('');
    const [reEnterResetPassword, setReEnterResetPassword] = useState('');
    const [timerresetpage, setTimerResetPage] = useState(300);
    const [resetback, setResetback] = useState(true);


    useEffect(() => {
       
        let interval;
        if (timerresetpage > 0) {
            interval = setInterval(() => {
                setTimerResetPage((prev) => prev - 1);
            }, 1000);
        }
        else if (interval === 0 && resetback) {
            setResetback(false);
        }

        return () => clearInterval(interval);
    }, [timerresetpage,resetback]);

    useEffect(() => {
        if (timerresetpage === 0) {
            setResetback(false);
        }
    }, [timerresetpage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (timer === 0){
        }
        if (resetPassword !== reEnterResetPassword) {
            props.showAlart('Password do not match');
            return;
        }

        if (resetPassword === reEnterResetPassword) {
            try {
                await axios.post('/api/LogIn/ForgatePw/ResetPassword', { email, resetPassword });
                props.showAlart('Password Reset succesfully');
                navigate('/LogIn');
            }
            catch (error) {
                if (error.response && error.response.status === 500) {
                    props.showAlart('Error  inserting in database')
                }
                else {
                    props.showAlart('Internal error');
                }
            }
        }
        else {


            props.showAlart('Please Write a password');

        }

    }

    return (
        <div id='reset-password'>

            {resetback ? (
                <div className="reset-password-box">
                    <h2>Reset your Password</h2> <form onSubmit={handleSubmit}>
                        <input type="password" name="reset-password" onChange={(e) => { setResetPassword(e.target.value) }} value={resetPassword} placeholder='Reset password' id="" required autoCorrect='none' />
                        <input type="password" name="reenter-reset-password"
                            onChange={(e) => { setReEnterResetPassword(e.target.value) }}
                            value={reEnterResetPassword} placeholder='Re-enter password' required  autoCorrect='none'/>
                        <button type='submit'>Change password</button>
                    </form>
                    <hr />
                    <button onClick={() => { navigate('/') }} className=' reset-btn'> Back to Home page</button>
                </div>) : (<div className=' backto-log-in'>
                    <h2>Session expired, Back to Login Page
                        <button onClick={() => {
                            navigate('/LogIn');
                        }}>Back</button>
                    </h2>
                </div>)}
        </div>
    )
}

export default ResetPassword
