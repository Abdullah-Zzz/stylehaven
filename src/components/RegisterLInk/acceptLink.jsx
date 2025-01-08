import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";


export default function CheckLink(){
    const Backend_URL = import.meta.env.VITE_BACKEND_URL
    const {token} = useParams()
    const navigate  = useNavigate()
    const [msg,setMsg] = React.useState()

    React.useEffect(()=>{
        axios.get(`${Backend_URL}/api/users/register/link/${token}`,{
            validateStatus : function (status) {
                return status < 500
            }
        })
        .then(res =>{
            if (res.status == 200){
                navigate('/login')
            }
            else{
                setMsg(res.data.message)
                setTimeout(()=>{

                },2000)
            }
        })
        .catch(err => {
            setMsg(err)
            setTimeout(()=>{

            },2000)
        })
    },[])

    return (
        <h1>
            {msg}
        </h1>
    )

}