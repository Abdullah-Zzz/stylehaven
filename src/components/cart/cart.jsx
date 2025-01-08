import React from "react";
import Nav from "../Home/nav/nav";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItemQty, updateItemSize } from "../../redux/reducers/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
    const items = useSelector((state) => state.items);
    const dispatch = useDispatch();
    let total = 0;
    const Backend_URL = import.meta.env.VITE_BACKEND_URL;

    const notify = (str) => toast(str);

    const setPrice = () => items.map((item) => (total += item.discountPrice));
    const deliveryCharges = 150;

    React.useEffect(() => {
        const message = localStorage.getItem("orderMessage");
        if (message) {
            notify(message); // Notify after retrieving it
            setTimeout(() => {
                localStorage.removeItem("orderMessage");
            }, 100);
        }
    }, []);

    return (
        <section className="min-h-screen bg-gray-100">
            <Nav />
            {items.length === 0 ? (
                <div className="flex flex-col mt-24 items-center text-center">
                    <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-10929688-8779494.png"
                        alt="Empty Cart"
                        className="w-72 md:w-96"
                    />
                    <h1 className="text-2xl font-bold text-gray-700 mt-4">Your Cart is Empty</h1>
                    <p className="text-gray-500 mt-2">Start adding items to see them here!</p>
                    <Link to="/" className="mt-6">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="mt-8 px-6">
                        <h1 className="font-bold text-3xl text-gray-800">Shopping Cart</h1>
                    </div>
                    <div className="mt-4 px-4 lg:flex lg:gap-8">
                        {/* Cart Items Section */}
                        <div className="flex flex-col w-full lg:w-2/3 space-y-6">
                            {items &&
                                items.map((item) => (
                                    <div
                                        className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden p-4"
                                        key={item.id}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.type}
                                            className="w-full md:w-32 lg:w-40 h-auto object-cover"
                                        />
                                        <div className="flex flex-col flex-grow pl-4">
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg font-semibold text-gray-800 mr-4">{item.type}</p>
                                                <button
                                                    className="text-red-500 hover:underline"
                                                    onClick={() => dispatch(removeItem(item.id))}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <span className="block">
                                                    Price:{" "}
                                                    <b className="text-gray-800">PKR {item.discountPrice}</b>
                                                </span>
                                                <span className="line-through text-gray-400 ml-2">
                                                    PKR {item.price}
                                                </span>
                                                <span className="text-blue-600 font-bold ml-2">
                                                    ({item.discountPerc}% OFF)
                                                </span>
                                            </div>
                                            <div className="flex flex-col md:flex-row md:items-center mt-4 gap-4">
                                                {/* Size Selector */}
                                                <div className="flex items-center">
                                                    <label className="text-sm text-gray-600">Size:</label>
                                                    <p className="font-bold ml-2">{item.selectedSize}</p>
                                                    <select
                                                        className="ml-2 px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) =>
                                                            dispatch(
                                                                updateItemSize({
                                                                    id: item.id,
                                                                    value: e.target.value,
                                                                })
                                                            )
                                                        }
                                                        value={item.selectedSize}
                                                    >
                                                        {item.sizes.map((size) => (
                                                            <option value={size} key={size}>
                                                                {size}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Quantity Selector */}
                                                <div className="flex items-center">
                                                    <label className="text-sm text-gray-600">Qty:</label>
                                                    <p className="font-bold ml-2">{item.selectedQty}</p>
                                                    <select
                                                        className="ml-2 px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                        onChange={(e) =>
                                                            dispatch(
                                                                updateItemQty({
                                                                    id: item.id,
                                                                    value: parseInt(e.target.value),
                                                                })
                                                            )
                                                        }
                                                        value={item.selectedQty}
                                                    >
                                                        {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                                                            <option value={number} key={number}>
                                                                {number}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Summary Section */}
                        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6 h-80">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                                Order Summary
                            </h2>
                            <div className="text-gray-600 space-y-2">
                                <div className="flex justify-between">
                                    <p>Item Total</p>
                                    <p>PKR {setPrice() && total}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Delivery Charges</p>
                                    <p>PKR {deliveryCharges}</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-800 mt-4 border-t pt-2">
                                <p>Grand Total</p>
                                <p>PKR {total + deliveryCharges}</p>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">Estimated delivery time: 3-5 days</p>
                            <Link to="/checkout">
                                <button className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg mt-4 hover:bg-blue-500">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </>
            )}
            <ToastContainer />
        </section>
    );
}
