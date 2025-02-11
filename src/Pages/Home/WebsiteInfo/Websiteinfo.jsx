import React, { useContext, useEffect, useState } from 'react'
import './Websiteinfo.css'

import studyvaultlogo from '../../../photo/Study⁐Vault-logo-black.png'
import axios from 'axios'
import {useNavigate } from 'react-router'
import { AlartContectValue } from '../../../Context/AlartContext/AlartContext'


const Websiteinfo = (props) => {
    const [connetuspopup, setConnectuspopup] = useState(false);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [errormessage, setErrormessage] = useState('');
    const [sendcomplete, setSendcomplete] = useState(false);
    const {showAlart} = useContext(AlartContectValue);
    const [messageus, setMessageus] = useState({
        firstName: '',
        lastName: '',
        gmail: '',
        message: ''
    })
    const handlemessagechange = (e) => {
        const { name, value } = e.target;
        setMessageus({
            ...messageus,
            [name]: [value]
        })
    };
    const messagesubmit = async (e) => {

        e.preventDefault();
        setErrormessage(" ");
        setLoad(true);
        try {
            const response = await axios.get('/api/connectusdata', { params: messageus });

            if (response.status === 200) {
          
                setLoad(false);
                setSendcomplete(true);
                setMessageus({
                    firstName: '',
                    lastName: '',
                    gmail: '',
                    message: ''
                });
            }

        } catch (error) {
            setLoad(false);
            setErrormessage("Message not sent!")
        }
    }

    useEffect(() => {
        if (connetuspopup) {
            document.body.style.overflow = 'hidden';
        } else {

            document.body.style.overflowY = 'scroll';
        }
    }, [connetuspopup]);



    return (
        <section id='website-info'>
            <div className="studyvault-logo">

                <img src={studyvaultlogo} alt="" />
            </div>

            <div className="website-info-msg">
                <h1>The Future of Exam  <br />Preparation Starts Here!</h1>
                <h2>Small step to make your exam easy.</h2>

                <h3>This  website is running in our own fund. <br />Support our mission by donating to help us grow.</h3>
                {/* <button className='active' onClick={() =>  showAlart('Available soon', '','cancel')}>Donate Us</button> */}
                <button className='active' onClick={() => navigate('/payment-donate-us')}>Donate Us</button>

                <h3>Connect with Us <br /> for advertising opportunities and reach a wider audience!</h3>
                <button className='active' onClick={() => setConnectuspopup(true)}>Connect Us</button>
                <div className={`connectus-popup`} style={connetuspopup ? { transform: 'scale(1)' } : { transform: 'scale(0)' }} >
                    {!sendcomplete ? (<div className="connectus-popup-msg" style={connetuspopup ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}>
                        <div className="connectus-popup-close" onClick={() => {
                            setConnectuspopup(false);
                            setErrormessage('');
                        }}>x</div>
                        <aside >
                            <img src={studyvaultlogo} alt="studyvault-logo" /><br />
                            <small>Partner with us to showcase your brand—connect now to explore exciting advertising opportunities on our platform!</small>
                        </aside>
                        <div>
                            <form action="GET" onSubmit={messagesubmit} >
                                <div className="connectus-input-box">
                                    <input type="text" name='firstName' onChange={handlemessagechange} value={messageus.firstName} placeholder='First Name' required />

                                    <input type="text" name='lastName' onChange={handlemessagechange} value={messageus.lastName} placeholder='Last Name' required />


                                    <input type="gmail" name='gmail' onChange={handlemessagechange} value={messageus.gmail} placeholder='Your Gmail' required />
                                </div>
                                <textarea name="message" id="" cols='40' rows='5' value={messageus.message} onChange={handlemessagechange} placeholder='Type Message Here' required>

                                </textarea>
                                <button disabled={load} style={load ? { background: 'rgb(132, 173, 238)' } : { background: '' }} type='submit' className='active'>{!load ? 'Send' : <div className="loader"></div>}  </button>
                            </form>
                        </div>
                        {errormessage && <p style={{ margin: '1rem 0', color: 'red' }}>{errormessage}</p>}
                    </div>) : (
                        <div className="connectus-popup-msg" style={connetuspopup ? { transform: 'scale(1)', display :'flex', justifyContent :'center', alignItems : 'center', flexDirection : 'column' } : { transform: 'scale(0)' }}>
                          
                            <i className="fa-regular fa-circle-check" style={{color : 'green', fontSize : '9rem'}}></i>
                               <span style={{color : 'green', fontSize : '1.8rem ', fontWeight :'600', textAlign :'center'}}>Successfully Message send.</span>
                                <button onClick={()=> {setConnectuspopup(false)
                                    setSendcomplete(false);
                                }}>Done</button>
                        </div>
                    )}
                </div>

                <div style={{ height: '0.2rem', width: '90%', background: "#fff", margin: '0rem auto 1rem', display: 'block', borderRadius: '1rem' }}>
                </div>
            </div>
        </section>
    )
}

export default Websiteinfo
