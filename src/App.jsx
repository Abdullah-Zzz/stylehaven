import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home/home'
import Order from './components/order/order'
import Cart from './components/cart/cart'
import NotFound from './components/404notfound/404'
import ViewAll from './components/viewAll/viewAll'
import Checkout from './components/checkout/checkout'
import Register from './components/Register/register'
import Login from './components/login/login'
import CheckLink from './components/RegisterLInk/acceptLink'
import {LoginRouteProtect,CheckoutProtect,DashboardProtect,ResetPassProtect} from './utils/protectedRoutes'
import Dashboard from './components/dashboard/dashboard'
import BuyNow from './components/buynow/buynow'
import { Button } from '@mui/material'
import ForgotPassword from './components/forgotpass/forgotpass'
import ResetPassword from './components/changepass/changepass'
import Nav from './components/Home/nav/nav'

function App() {

  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/order/:name/:id' element={<Order/>}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/view/:name' element={<ViewAll/>}></Route>      
      <Route path='/*' element={<NotFound />}> </Route>

      <Route element={<DashboardProtect />}>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Route>
    
      <Route element={<CheckoutProtect/>}>
       <Route path='/checkout' element={<Checkout />}/>
      </Route>
      
      <Route element={<LoginRouteProtect/>}>
        <Route path='/register' element={<Register />}/>
        <Route path="/login" element={<Login/>}/>
      </Route>
        
      <Route path='/buynow/:id' element = {<BuyNow/>}> </Route>
      <Route path='/resetpass' element={<ForgotPassword />} ></Route>
      <Route element={<ResetPassProtect/>}>
      <Route path='/resetpass/link/:token' element={<ResetPassword />} ></Route>
      </Route>

      <Route path='/register/link/:token' element={<CheckLink />} > </Route>
    </Routes>
    </>

  )
}

export default App
