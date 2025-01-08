import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BasicMenu from './dropDown';

function Nav() {
  const [showNav, setShowNav] = React.useState(false);
  const items = useSelector(state => state.items);
  const [userDetails, setUserDetails] = React.useState();
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;

  React.useEffect(() => {
    axios
      .get(`${Backend_URL}/api/users/details`, {
        withCredentials: true,
        validateStatus: function(status) {
          return status < 500;
        },
      })
      .then(res => {
        if (res.status === 200) {
          setUserDetails(res.data);
        }
      })
      .catch(err => {
        throw err;
      });
  }, []);

  return (
    <nav className='flex flex-col border-b-2 pb-2 sticky top-0 bg-white z-10 h-auto '>
    <div
      className={
        showNav
          ? 'h-auto   flex justify-between '
          : 'w-screen  flex justify-between '
      }
    >
       <div
          onClick={() => setShowNav(prev => !prev)}
          className="mt-8 ml-2 md:hidden "
        >
          <Hamburger />
        </div>
      <div className="hidden md:flex mt-8">
        <ul
          className={
            showNav
              ? 'flex flex-col ml-4 mt-4 md:flex-row '
              : 'hidden md:flex flex-row'
          }
        >
          <Link to="/">
            <li className="mt-4 text-xl text-gray-600 hover:text-black md:ml-6">
              Home
            </li>
          </Link>
          <Link to="/">
            <li className="mt-4 text-xl text-gray-600 hover:text-black md:ml-6">
              Privacy Policy
            </li>
          </Link>
          <Link to="/">
            <li className="mt-4 text-xl text-gray-600 hover:text-black md:ml-6">
              Contact Us
            </li>
          </Link>
        </ul>
      </div>

      <div className="mt-[12px]">
        <img src="/trans_800x800.png" className="w-[80px] h-auto" />
      </div>

      <div className="flex mr-4">
        {userDetails ? (
          <div className="mr-2 mt-11 ">
            <BasicMenu name={userDetails.name} />
          </div>
        ) : (
          <Link to="/register">
            <span className="mr-4 border-2 border-gray-600 rounded-full flex justify-center items-center w-14 h-14 md:w-16 md:h-16 mt-8 md:mt-6">
              <img src="/user.png" className='w-[22px] md:w-[24px]' />
            </span>
          </Link>
        )}

        <Link to="/cart">
          {items.length === 0 ? null : (
            <div className="bg-red-600 absolute w-[20px] h-[20px] ml-[13px] mt-[20px] rounded-full text-white flex justify-center items-center">
              <p className="font-bold ">{items.length}</p>
            </div>
          )}
          <span className="border-2 border-gray-600 rounded-full flex justify-center items-center w-14 h-14 md:w-16 md:h-16 mt-8 md:mt-6 ">
            <img src="/shopping-cart.png" className='w-[22px] md:w-[25px]' />
          </span>
        </Link>
      </div>
    </div>
    <div className="flex md:hidden">
        <ul
          className={
            showNav
              ? 'flex flex-col ml-4 mt-4 mb-4'
              : 'hidden'
          }
        >
          <Link to="/">
            <li className="mt-6 text-xl text-gray-600 hover:text-black ">
              Home
            </li>
          </Link>
          <Link to="/">
            <li className="mt-6 text-xl text-gray-600 hover:text-black">
              Privacy Policy
            </li>
          </Link>
          <Link to="/">
            <li className="mt-6 text-xl text-gray-600 hover:text-black">
              Contact Us
            </li>
          </Link>
        </ul>
      </div>
    </nav>

  );
}

export default Nav;
