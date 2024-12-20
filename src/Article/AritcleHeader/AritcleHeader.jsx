import React from 'react'
import './ArticleHeader.css'
import { NavLink, useLocation } from 'react-router-dom'

const AritcleHeader = () => {
    const location = useLocation();

    return (
        <>
            <section id='article-header'>
                <header className='article-header-box'>
                    <NavLink to= '/'>Main Page</NavLink>
                    <h1 className="web-logo-top" > STUDYVAULT</h1>
                    <NavLink to = '/logIn'>Log In</NavLink>
                </header>
            <hr />
                <div className="article-content-item">
                    <NavLink to='' className={`${location.pathname === ''}`}> Home</NavLink>
                    <NavLink to='colleges-article'> College</NavLink>
                    <NavLink to='/article-section'> News</NavLink>
                    <NavLink to='/article-section'> Tips</NavLink>
                </div>
            </section>
            <hr />
        </>
    )
}

export default AritcleHeader
