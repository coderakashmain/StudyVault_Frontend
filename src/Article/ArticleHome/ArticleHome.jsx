import React from 'react'
import './ArticleHome.css'
import CollegeAritcle from '../CollegeArticle/CollegeAritcle'

const ArticleHome = () => {
  return (
    <section id='article-home'>
      <header className='article-home-header' >Home</header>
      <CollegeAritcle/>
       <div className="news-article-box">
              <h1>News</h1>
              <div className="news-article-content" >
                <div className="news-image-1-box">
                </div>
                <div className="news-link-to-read-article">
                  <h1>Update Soon</h1>
                </div>
              </div>
      
            </div>
    </section>
  )
}

export default ArticleHome
