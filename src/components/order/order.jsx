import React from "react";
import Nav from "../Home/nav/nav";
import Collection from "../collection/collections";
import Footer from "../footer/footer";
import { useParams } from "react-router-dom";
import { addItem } from "../../redux/reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ImageSlider from "../Slider/ImageSlider";
import { Link } from "react-router-dom";
import FullScreenLoading from "../loadingComp/fullScreenloader";

export default function Order() {
    const [selectedSize, setSize] = React.useState("SM")
    const [quantity, setQuantity] = React.useState(1)
    const { name, id } = useParams()
    const [loading, setLoading] = React.useState(false)

    const [value, setValue] = React.useState(2);
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [Info, setInfo] = React.useState()

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${backend_url}/api/data/getitems`)
                setInfo(res.data[0])
            }
            catch (err) {
                throw err
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    const data = Info && Info.availableItems.filter((item) => {
        return item.name.split(" ")[0].toLowerCase() == name
    })

    const shirtData = data && data[0].details.filter((item) => {
        return item.id == id
    })

    const dispatch = useDispatch()

    const cartItems = useSelector(state => state.items)

    const notify = () => {
        const alreadyInCart = shirtData && cartItems.some(item => item.id === shirtData[0].id);

        if (!alreadyInCart) {
            toast("Item Added");
        }
        else {
            toast("Item Already In Cart")
        }
    }
    console.log(data)
    return (
        <section>
            {loading && <FullScreenLoading />}
            <div className="flex mt-8 md:pl-4 pr-4 flex-col md:flex-row">
                <div className="border-2 flex justify-center items-center w-screen md:w-96 h-96 ">
                    {/* <img src={shirtData && shirtData[0].image} className="w-[70%] h-auto md:[100%]" /> */}
                    <ImageSlider imageURLs={[shirtData && shirtData[0].image, shirtData && shirtData[0].image, shirtData && shirtData[0].image]} />
                </div>
                <div className=" md:pl-8 w-[100%] md:w-[60%] pl-2">
                    <p className='font-bold mt-4 text-2xl'>{shirtData && shirtData[0].type}</p>
                    <div className='flex mt-2 w-full items-center '>
                        <p className='text-md '>PKR: <i><b>{shirtData && shirtData[0].discountPrice}</b></i></p>
                        <p className='text-sm font-bold ml-4 text-slate-500'><del><i>PKR:{shirtData && shirtData[0].price}</i></del></p>
                        <p className='text-md font-bold ml-4 text-blue-700'>({shirtData && shirtData[0].discountPerc}% OFF)</p>
                    </div>
                    <div className="mt-8" >
                        <p className="font-bold ">Select Size</p>
                        <div className="flex mt-4">
                            {
                                shirtData && shirtData[0].sizes.map((size, index) => {
                                    return (
                                        <div key={index} className={selectedSize == size ? "border-2 w-16 flex items-center justify-center h-10 mr-6 bg-slate-900 rounded-full font-bold text-white " : "border-2 w-16 flex items-center justify-center h-10 mr-6 hover:bg-slate-900 hover:rounded-full font-bold hover:text-white "} onClick={(e) => setSize(size)} >
                                            {size}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <p className="font-bold mt-4">Select Quantity</p>
                        <select className="pl-6 pr-6 pt-[4px] pb-[4px] mt-4 bg-transparent border-2 text-bold" onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map(number => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="mt-12 flex w-full">
                        <button className="w-[50%] border-2 border-slate-800 h-16 rounded-xl mr-4 md:mr-8 font-bold" onClick={(e) => {
                            dispatch(addItem(shirtData && { ...shirtData[0], selectedSize: selectedSize, selectedQty: quantity }));
                            notify()
                        }}>
                            Add To Cart
                        </button>
                        <Link to={`/buynow/${id}`} className="w-[50%]">
                            <button className=" w-full border-none bg-slate-800 h-16 rounded-xl text-white font-bold">
                                Buy Now
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
            <section className="mt-8  flex justify-center flex-col items-center ">
                <h1 className="font-bold text-4xl mt-8">
                    Similar Items
                </h1>
                <div className="">
                    <div className="flex flex-row justify-around w-screen flex-wrap  ">
                        {
                            data && data[0].details.map((shirt, index) => {
                                if (shirt.id != id) {
                                    return (
                                        <div className="m-16 w-full sm:w-60 flex flex-col items-center justify-between pb-6 pt-6 mb-4 md:mr-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200">
                                            <Link to={`/order/${data[0].name.split(" ")[0].toLowerCase()}/${shirt.id}`} key={index} className="">

                                                <img src={shirt.image} alt={shirt.type} className='w-full object-cover rounded-t-lg' />
                                                <div className='p-4 text-center'>
                                                    <p className='font-bold text-lg text-gray-800'>{shirt.type}</p>
                                                    <div className='flex flex-col items-center mt-2'>
                                                        <p className='text-sm font-bold text-gray-700'>PKR: <i>{shirt.discountPrice}</i></p>
                                                        <p className='text-xs font-bold text-gray-500'><del>PKR: {shirt.price}</del></p>
                                                        <p className='text-sm font-bold text-blue-700 mt-1'>({shirt.discountPerc}% OFF)</p>
                                                    </div>
                                                </div>
                                            </Link>

                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </section>
            <Footer />
            <ToastContainer />

        </section>
    )
}