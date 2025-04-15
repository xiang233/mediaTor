import React from 'react'
import MediaNavbar from '../../components/media/Navbar'
import { Outlet,useOutletContext } from 'react-router-dom'
import { useState } from 'react';
function MediaScreen() {
    const [searchResult, setSearchResult] = useState([]);
  return (
    <>
    <MediaNavbar ></MediaNavbar>
    <Outlet context={[searchResult, setSearchResult ]}/>
    </>
  )
}

export default MediaScreen