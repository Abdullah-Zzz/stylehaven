// ResetPassword.js
import React from "react";
import Nav from "../Home/nav/nav";
import Footer from "../footer/footer";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import FullScreenLoading from "../loadingComp/fullScreenloader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const [loading,setLoading] = React.useState(false)
    const navigate  = useNavigate()
    const [password,setPassword] = React.useState({
        pass : '',
        confirmPass : ''
    })
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const notify = (msg) =>{
        toast(msg)
    }
    const token = useParams()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const res = await axios.post(`${backend_url}/api/users/reset/password/${token.token}`,password,{
            validateStatus : (stat) => stat < 500
        })
        setLoading(false)
        if(res.status == 200){
          localStorage.setItem('orderMessage',res.data.message)
          location.reload()
          navigate('/')

        }
        else{
          notify(res.data.message)    
        }
    }

  return (
    <>
    {loading ? <FullScreenLoading /> : null}
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="w-full max-w-md mx-auto p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center">
          Enter your new password below to reset it.
        </p>

        <form className="mt-4 space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              name="pass"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your new password"
              onChange={(e) => setPassword({...password,[e.target.name]:e.target.value})}
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirmPass"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm your new password"
              onChange={(e) => setPassword({...password,[e.target.name]:e.target.value})}

            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 text-white font-medium bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset Password
          </button>
        </form>

        <div className="text-sm text-center">
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
      <Footer />
    </div>
    <ToastContainer/>
    </>
  );
};

export default ResetPassword;
