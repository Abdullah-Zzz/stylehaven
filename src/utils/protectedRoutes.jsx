import { Navigate,Outlet, useParams } from "react-router-dom";
import React from "react";
import axios from 'axios';
import { useDispatch,useSelector } from "react-redux";


export const LoginRouteProtect = () => {
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [authenticated, setAuthenticated] = React.useState(false); // Default as false (not authenticated)

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(`${Backend_URL}/api/users/details`, {
          withCredentials: true,
          validateStatus: function (status) {
            return status < 500; // Only handle statuses less than 500
          },
        });
        if (res.status === 200) {
          setAuthenticated(true); // User is authenticated
        } else {
          setAuthenticated(false); // User is not authenticated
        }
      } catch (err) {
        console.error("Error during authentication check:", err);
        setAuthenticated(false); // If error occurs, assume user is not authenticated
      }
    };

    checkAuthentication(); // Run the authentication check
  }, [Backend_URL]);

  // Return the appropriate component based on the authentication status
  return authenticated ? <Navigate to="/" /> : <Outlet />;
};



export const CheckoutProtect = () =>{
    const items = useSelector(state => state.items)
    console.log(items)
    return items.length ? <Outlet />  : <Navigate to={'/cart'} />
    
}

export const DashboardProtect = () => {
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [authenticated, setAuthenticated] = React.useState(false); 
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(`${Backend_URL}/api/users/details`, {
          withCredentials: true,
          validateStatus: function (status) {
            return status < 500; 
          },
        });
        if (res.status === 200) {
          setAuthenticated(true); 
        } else {
          setAuthenticated(false); 
        }
      } catch (err) {
        console.error("Error during authentication check:", err);
        setAuthenticated(false); 
      } finally {
        setLoading(false); 
      }
    };

    checkAuthentication(); 
  }, [Backend_URL]);

  if (loading) {
    return null; 
  }

  return authenticated ? <Outlet /> : <Navigate to="/" />;
};

export const ResetPassProtect = () => {
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [authenticated, setAuthenticated] = React.useState(false); 
  const [loading, setLoading] = React.useState(true); 
  const token = useParams()

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get(`${Backend_URL}/api/users/check/resetlink/${String(token.token)}`, {
            validateStatus: function (status) {
            return status < 500; 
          },
        });
        if (res.status === 200) {
          setAuthenticated(true); 
        } else {
          setAuthenticated(false); 
        }
      } catch (err) {
        console.error("Error during authentication check:", err);
        setAuthenticated(false); 
      } finally {
        setLoading(false); 
      }
    };

    checkAuthentication(); 
  }, [Backend_URL]);

  if (loading) {
    return null; 
  }

  return authenticated ? <Outlet /> : <Navigate to="/" />;
};



