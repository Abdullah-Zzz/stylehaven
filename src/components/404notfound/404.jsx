import React from "react";
import Nav from "../Home/nav/nav";
import Footer from "../footer/footer"
import { Link } from "react-router-dom";

export default function NotFound(){

    return(
        <section className="">
            <section className="flex mt-4 justify-center items-center min-h-[60vh]">
                <div className="p-[20px] text-[50px] border-r-2 border-black sm:text-[120px]">
                    <h1>404</h1>
                </div>
                <div className="flex flex-col justify-center ml-4 p-2 text-sm sm:text-xl">
                    <h2>This page was not found.</h2>
                    <h3>Go to <Link to={"/"}>homepage</Link></h3>
                </div>
            </section>
            <Footer />
        </section>
    )

}