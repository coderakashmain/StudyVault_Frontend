import React, { createContext, useState } from 'react'

export const ArticleSubheadingContext = createContext();
const ArticleSubheading = (props) => {

        const [heading, setHeading] = useState('');
  return (
     <ArticleSubheadingContext.Provider value={{heading,setHeading}}>
            {props.children}
       </ArticleSubheadingContext.Provider>
  )
}

export default ArticleSubheading
