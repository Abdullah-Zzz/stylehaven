import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categories() {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [Info, setInfo] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${backend_url}/api/data/getitems`);
            setInfo(res.data[0]);
        };
        fetchData();
    }, []);

    return (
        <section className="mt-24 px-4 md:px-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Categories</h1>
            <div className="flex justify-evenly flex-wrap ">
                {Info &&
                    Info.categories.map((category, index) => (
                        <Link to={`/view/${category.type.split(" ")[0].toLowerCase()}`} key={index}>
                            <div className="relative w-full p-2  h-80 flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 group">
                                <img
                                    src={category.image}
                                    alt={category.type}
                                    className="w-[100%] h-[100%] object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-white text-black font-bold py-2 px-6 rounded-md transform transition-transform duration-300 hover:scale-105">
                                        {category.type}
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </section>
    );
}
