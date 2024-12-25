import React, { useContext } from 'react'
import './ArticleHeader.css'
import { NavLink, useLocation } from 'react-router-dom'
import { ArticleSubheadingContext } from '../../Context/ArticleSubheading/ArticleSubheading'


const AritcleHeader = () => {
    const location = useLocation();
    const {heading} = useContext(ArticleSubheadingContext);
 

    return (
        <>
            <section id='article-header'>
                <header className='article-header-box' >
                    <NavLink to= '/' className= ' active'>Main Page</NavLink>
                    <h1 className="web-logo-top" > STUDYVAULT<sub>ARTICLE</sub></h1>
                  <h2 style={{ color: '#000',padding : '0rem 2rem 0 1rem', fontSize : '1rem',fontWeight : '600' }}>Article</h2>
                </header>
            {/* <hr /> */}
                <div className="article-content-item">
                    <NavLink to='' className={`${location.pathname === '/article-section' ? 'state-on' : 'state-off'}`}> Home</NavLink>
                    <NavLink to='colleges-article'  className={`${location.pathname.startsWith('/article-section/colleges-article' )? 'state-on' : 'state-off'}`}> College</NavLink>
                    <NavLink to='/article-section'> News</NavLink>
                    <NavLink to='/article-section'> Tips</NavLink>
                </div>
            {/* <hr /> */}
              {heading && (location.pathname.startsWith('/article-section/colleges-article/')) &&( location.pathname !=='/article-section/colleges-article/') &&  (  <div className="article-sub-contect-title">
                    <h2 style={{textAlign : 'center', padding : '2rem 0rem 0.3rem' , fontSize : '0.9rem',textTransform : 'uppercase', fontWeight : '500'}}>{heading}</h2>
                    <hr />
                </div>)}
             
            </section>
        </>
    )
}

export default AritcleHeader
