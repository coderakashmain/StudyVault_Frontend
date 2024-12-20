import React from 'react'
import AritcleHeader from './AritcleHeader/AritcleHeader'
import { Outlet } from 'react-router-dom'

const AricleRouter = () => {
  return (
    <>
      <AritcleHeader/>
      <Outlet/>
    </>
  )
}

export default AricleRouter
