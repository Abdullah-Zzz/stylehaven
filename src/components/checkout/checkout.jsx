import React from "react";
import Nav from "../Home/nav/nav";
import Footer from "../footer/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addItem, removeItem, updateItemQty, updateItemSize, clearCart } from "../../redux/reducers/cartSlice";
import FullScreenLoading from "../loadingComp/fullScreenloader";

export default function Checkout() {
    const [count, setCount] = React.useState(1);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [loginData, setLoginData] = React.useState({ email: "", password: "" });
    const [userDetails, setUserDetails] = React.useState();
    const items = useSelector((state) => state.items);
    const [orderDetails, setOrderDetails] = React.useState({
        name: "",
        address: "",
        city: "Karachi",
        phone: "",
        itemID: items.reduce((acc, item) => {
            acc[item.id] = { size: item.selectedSize, qty: item.selectedQty };
            return acc;
        }, {}),
    });

    const Backend_URL = import.meta.env.VITE_BACKEND_URL;
    const deliveryCharges = 150;
    let total = items.reduce((acc, item) => acc + item.discountPrice * item.selectedQty, 0);

    const notify = (message) => toast(message);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${Backend_URL}/api/users/login/`, loginData, {
                validateStatus: (status) => status < 500,
                withCredentials: true,
            });
            setLoading(false);
            if (res.status === 200) location.reload();
            else notify(res.data.message);
        } catch {
            setLoading(false);
            notify("An error occurred during login.");
        }
    };

    React.useEffect(() => {
        (async () => {
            try {
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
        })();
    }, []);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${Backend_URL}/api/users/checkout/`, orderDetails, {
                validateStatus: (status) => status < 500,
                withCredentials: true,
            });
            setLoading(false);
            if (res.status === 200) {
                dispatch(clearCart());
                localStorage.setItem("orderMessage", res.data.message);
            } else {
                notify(res.data.message);
            }
        } catch {
            setLoading(false);
            notify("An error occurred during checkout.");
        }
    };

    return (
        <section className="w-full min-h-screen bg-gray-50">
            {loading && <FullScreenLoading />}
            <Nav />
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
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-4 mb-4 bg-white border rounded shadow"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.type}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div className="flex-1 ml-4">
                                        <p className="text-sm font-semibold">{item.type}</p>
                                        <p className="text-sm text-gray-500">
                                            Size: {item.selectedSize} | Qty: {item.selectedQty}
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        Rs. {item.discountPrice * item.selectedQty}
                                    </p>
                                </div>
                            ))}
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p>Subtotal</p>
                                    <p>Rs. {total}</p>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <p>Delivery Charges</p>
                                    <p>Rs. {deliveryCharges}</p>
                                </div>
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <p>Total</p>
                                    <p>Rs. {total + deliveryCharges}</p>
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
