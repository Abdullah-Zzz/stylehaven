// ForgotPassword.js
import React from "react";
import Nav from "../Home/nav/nav";
import Footer from "../footer/footer";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import FullScreenLoading from "../loadingComp/fullScreenloader";

const ForgotPassword = () => {

    const [email,setEmail] = React.useState('')
    const [loading,setLoading] = React.useState(false)
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const notify = (msg) =>{
        toast(msg)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const res = await axios.post(`${backend_url}/api/users/send/resetlink`,{email:email},{
            validateStatus : (stat) => stat < 500
        })
        setLoading(false)
        notify(res.data.message)    
    }

    console.log(email)
  return (
    <>
    {loading ? <FullScreenLoading /> : null}
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mx-auto mt-24 mb-24">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form className="mt-4 space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 text-white font-medium bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-sm text-center">
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    <Footer/>
    </div>
    <ToastContainer/>
    </>
  );
};

export default ForgotPassword;
