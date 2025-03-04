import React from "react";

export default function Hero() {
  return (
    <section className="flex justify-center">
      <div className="w-full">
        <div className="relative w-full min-h-screen overflow-hidden">
          {/* <div
            style={{
              background: "url('/hero3.jpg')",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
              opacity: 0.7,
            }}
            className="bg-center bg-cover bg-no-repeat"
          ></div> */}


          <div className=" h-full flex flex-col mt-6 lg:mt-0 lg:flex-row items-center w-full  justify-between text-center px-4 xl:px-10 lg:px-6">
            <div className="flex flex-col justify-start rounded-lg sm:w-full lg:w-[40%] xl:w-[45%]">
              <h1 className="text-gray-800 text-6xl lg:text-7xl font-extrabold text-start  ">
                Bring your shopping to the next <span className="text-gray-600">LEVEL.</span>
              </h1>
              <p className="text-gray-700 mt-4 text-lg lg:text-xl leading-relaxed max-w-2xl text-start">
                Unleash your style at <span className="font-bold text-gray-900">StyleHaven</span>.
                Explore our collection of trendy and timeless pieces designed to elevate your wardrobe and express your individuality.
              </p>
              <button className="w-40 mt-6 px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white font-medium text-sm md:text-base rounded-lg shadow-lg border-2 border-blue-800 hover:border-blue-900 transform hover:scale-105 transition-all duration-300">
                Start Shopping
              </button>
            </div>

            <div className=" flex items-start justify-end xl:w-[45%] lg:w-[55%] mt-6 lg:mt-2 rounded-lg ">
              <img src="/hero-min.jpg" alt="" className="h-full w-auto  object-cover" loading="lazy"/>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
