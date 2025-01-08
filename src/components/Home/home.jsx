import React from 'react'
import Nav from './nav/nav'
import Hero  from './hero/hero'
import Categories from './categories/categories'
import Collection from "../collection/collections"
import Footer from '../footer/footer'
import { ToastContainer,toast } from 'react-toastify'

function Home() {
  const notify = (msg)=>{
    toast(msg)
  }
  React.useEffect(()=>{
    const msg = localStorage.getItem('orderMessage')
    if (msg) notify(msg)
    setTimeout(()=>{
      localStorage.removeItem('orderMessage')
  },100)
  },[])
  return (
    <>
        <Nav/>
        <Hero/>
        <Categories />
        <Collection />
        <Footer />
        <ToastContainer/>
    </>
  )
}

export default Home
