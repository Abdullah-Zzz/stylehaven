import React from "react";
import Nav from "../Home/nav/nav";
import Footer from "../footer/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addItem, removeItem, updateItemQty, updateItemSize, clearCart } from "../../redux/reducers/cartSlice";
import FullScreenLoading from "../loadingComp/fullScreenloader";
import { skeletonClasses } from "@mui/material";

export default function BuyNow() {
    const [count, setCount] = React.useState(1);
    const navigate = useNavigate()
    const {id} = useParams()
    const [loading, setLoading] = React.useState(false);
    const [loginData, setLoginData] = React.useState({ email: "", password: "" });
    const [userDetails, setUserDetails] = React.useState();
   
    const [items,setItems] = React.useState()
    const [orderDetails, setOrderDetails] = React.useState({
        name: "",
        address: "",
        city: "Karachi",
        phone: "",
        itemID: {[id] : {size:'SM',qty:1}}
    });
    const Backend_URL = import.meta.env.VITE_BACKEND_URL;
    const selectedItem = items && items.find(item =>{
        return item.details.find(it =>{
           return  it.id == id
        })
    })?.details.find(it =>{
        return  it.id == id
     })

    const deliveryCharges = 150;

    const notify = (message) => toast(message);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${Backend_URL}/api/users/login/`, loginData, {
                validateStatus: (status) => status < 500,
                withCredentials: true,
            });
            setLoading(false);
            if (res.status === 200) location.reload();
            else notify(res.data.message);
        } catch {
            notify("An error occurred during login.");
        }
        finally{
            setLoading(false);
        }
    };
    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${Backend_URL}/api/users/details`, {
                    validateStatus: (status) => status < 500,
                    withCredentials: true,
                });
                if (res.status === 200) {
                    setCount(2);
                    setUserDetails(res.data);
                    setOrderDetails((prev) => ({
                        ...prev,
                        name: res.data.name || "",
                        phone: res.data.phone || "",
                    }));
                }
            } catch {
                notify("Please refresh the page.");
            }
            finally{
                setLoading(false)
            }
        })();
    }, []);
    React.useEffect(()=>{
        const getItemDetails = async () =>{
            try{
                setLoading(true);
                const res =  await axios.get(`${Backend_URL}/api/data/getitems`)
                if (res.status == 200){
                    setItems(res.data[0].availableItems)

                }
            }
            catch{
                throw err
            }
            finally{
                setLoading(false)
            }
        }
        getItemDetails()
    },[])
    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${Backend_URL}/api/users/checkout/`, orderDetails, {
                validateStatus: (status) => status <= 500,
                withCredentials: true,
            });
            setLoading(false);
            if (res.status === 200) {
                localStorage.setItem("orderMessage", res.data.message);
                navigate('/')
                location.reload()
            } else {
                notify(res.data.message);
            }
        } catch(err){
            setLoading(false);
            notify("An error occurred during checkout."+err);
        }
    };
    return (
        <section className="w-full min-h-screen bg-gray-50 pt-2">
            {loading && <FullScreenLoading />}
            <div className="px-6 mt-8 lg:mt-12">
                {/* Step Indicator */}
                <div className="flex flex-col justify-around mb-8 sm:flex-row ">
                    {["Login", "Delivery Address", "Order Summary"].map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-center mt-4 sm:mt-0${
                                count === index + 1 ? "text-purple-600" : "text-gray-400"
                            }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    count === index + 1
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-300"
                                } font-bold`}
                            >
                                {index + 1}
                            </div>
                            <p className="ml-2 text-sm md:text-base">{step}</p>
                        </div>
                    ))}
                </div>


                {/* Step Content */}
                <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    {count === 1 && (
                        <form onSubmit={handleLogin}>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                Login to Proceed
                            </h2>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border rounded mb-4 focus:outline-purple-600"
                                required
                                onChange={(e) =>
                                    setLoginData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border rounded focus:outline-purple-600"
                                required
                                onChange={(e) =>
                                    setLoginData((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white font-semibold rounded mt-4 hover:bg-purple-500"
                            >
                                Login
                            </button>
                            <p className="text-center mt-4 text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-purple-600 font-bold"
                                >
                                    Register Here
                                </Link>
                            </p>
                        </form>
                    )}

                    {count === 2 && (
                        <form onSubmit={() => setCount((prev) => prev + 1)}>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                Enter Delivery Details
                            </h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={orderDetails.name}
                                required
                                onChange={(e) =>
                                    setOrderDetails((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                className="w-full p-3 border rounded mb-4 focus:outline-purple-600"
                            />
                            <textarea
                                placeholder="Address"
                                value={orderDetails.address}
                                required
                                onChange={(e) =>
                                    setOrderDetails((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }
                                className="w-full p-3 border rounded mb-4 focus:outline-purple-600"
                            ></textarea>
                            <div className="flex flex-wrap gap-4">
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={orderDetails.phone}
                                    required
                                    onChange={(e) =>
                                        setOrderDetails((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                    className="flex-1 p-3 border rounded focus:outline-purple-600"
                                />
                                <select
                                    value={orderDetails.city}
                                    onChange={(e) =>
                                        setOrderDetails((prev) => ({
                                            ...prev,
                                            city: e.target.value,
                                        }))
                                    }
                                    className="flex-1 p-3 border rounded focus:outline-purple-600"
                                >
                                    <option value="Karachi">Karachi</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white font-semibold rounded mt-4 hover:bg-purple-500"
                            >
                                Continue
                            </button>
                        </form>
                    )}

                    {count === 3 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                Order Summary
                            </h2>
                            <div className="mb-6 p-4 bg-gray-100 rounded shadow">
                                <p className="font-semibold">Delivery Address</p>
                                <p>{orderDetails.name}</p>
                                <p>{orderDetails.address}</p>
                                <p>{orderDetails.phone}</p>
                            </div>
                                <div
                                    key={selectedItem.id}
                                    className="flex justify-between items-center p-4 mb-4 bg-white border rounded shadow"
                                >
                                    <img
                                        src={selectedItem.image}
                                        alt={selectedItem.type}
                                        className="w-16 h-16 object-cover"
                                        loading="lazy"
                                    />
                                    <div className="flex-1 ml-4">
                                        <p className="text-sm font-semibold">{selectedItem.type}</p>
                                        <p className="text-sm text-gray-500">
                                            Size: {orderDetails.itemID[id].size}  
                                            <select className="ml-4 bg-slate-300 pl-1" onChange={(e) => setOrderDetails({...orderDetails,itemID : {[id] : {...orderDetails.itemID[id] , size:e.target.value}} })}>
                                                <option value={'SM'}>
                                                    SM
                                                </option>
                                                <option value={'MD'}>
                                                    md
                                                </option>
                                                <option value={'LG'}>
                                                    lg
                                                </option>
                                            </select>
                                            
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {orderDetails.itemID[id].qty}
                                            <select className="ml-4 bg-slate-300 pl-1" onChange={(e) =>setOrderDetails({...orderDetails,itemID : {[id] : {...orderDetails.itemID[id] , qty:e.target.value}} })}>
                                                {
                                                    Array.from({length:10},(_,i) => i+1).map(num =>{
                                                        return <option value={num} key={num}>
                                                            {num}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                            
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        Rs. {selectedItem.discountPrice }
                                    </p>
                                </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p>Subtotal</p>
                                    <p>Rs. {selectedItem.discountPrice * orderDetails.itemID[id].qty}</p>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <p>Delivery Charges</p>
                                    <p>Rs. {deliveryCharges}</p>
                                </div>
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <p>Total</p>
                                    <p>Rs. {(selectedItem.discountPrice*orderDetails.itemID[id].qty) + deliveryCharges}</p>
                                </div>
                            </div>
                            <button  onClick={() => setCount((prev) => prev-1)} className="w-1/4 sm:w-1/5 py-3 bg-green-600 text-white font-semibold rounded mt-4 hover:bg-green-500" >Go Back</button>
                            <button
                                onClick={handleCheckout}
                                className="w-3/5 sm:w-3/4 py-3 ml-6 bg-green-600 text-white font-semibold rounded mt-4 hover:bg-green-500"
                            >
                                Place Order
                            </button>
                           
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}
