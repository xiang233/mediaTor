import React from 'react'
import Header from '../../components/shop/Navbar'
import { Outlet } from 'react-router-dom'
function ShopScreen() {
  return (
    <>
    <Header></Header>
    <Outlet/>
    </>
  )
}

export default ShopScreen