import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

function Collection() {

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [Info, setInfo] = React.useState()

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${backend_url}/api/data/getitems`)
            setInfo(res.data[0])
        }
        fetchData()
    }, [])

    return (
        <section className='flex flex-col items-center mt-14'>
            {
                Info && Info.availableItems.map((item, index) => {
                    return (
                        <div key={index} className='text-center mt-12 w-screen'>
                            <h1 className='font-bold text-4xl mb-12 w-full text-gray-800 '>
                                {item.name}
                            </h1>
                            <div className='flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-8'>
                                {
                                    item.details.map((shirt, index) => {
                                        return (
                                            <Link to={`/order/${item.name.split(" ")[0].toLowerCase()}/${shirt.id}`} key={index} className='w-[80%] md:w-96'>
                                                <div className="md:w-96 flex flex-col items-center justify-between pb-6 pt-6 mb-4 md:mr-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-200">
                                                    <img src={shirt.image} alt={shirt.type} className='w-full object-cover rounded-t-lg' />
                                                    <div className='p-4 text-center'>
                                                        <p className='font-bold text-lg text-gray-800'>{shirt.type}</p>
                                                        <div className='flex flex-col items-center mt-2'>
                                                            <p className='text-sm font-bold text-gray-700'>PKR: <i>{shirt.discountPrice}</i></p>
                                                            <p className='text-xs font-bold text-gray-500'><del>PKR: {shirt.price}</del></p>
                                                            <p className='text-sm font-bold text-blue-700 mt-1'>({shirt.discountPerc}% OFF)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            <Link to={`/view/${item.name.split(" ")[0].toLowerCase()}`}>
                                <button className="w-40 mt-6 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-medium text-sm md:text-base rounded-lg shadow-lg border-2 border-blue-800 hover:border-blue-900 transform hover:scale-105 transition-all duration-300">
                                    View All 
                                </button>
                            </Link>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Collection
