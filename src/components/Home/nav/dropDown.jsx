import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const Backend_URL = import.meta.env.VITE_BACKEND_URL
  const handleLogout = async (e) =>{
    try{
      const res = await axios.post(`${Backend_URL}/api/users/logout/`,{},{
        validateStatus : (status) =>{
          return status < 500
        },
        withCredentials : true,
      })
      if (res.status == 200){
          location.reload()
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <p className='font-bold text-black'>{props.name}</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link to={'/dashboard'}><MenuItem onClick={handleClose}>Dashboard</MenuItem></Link>
        <MenuItem onClick={(e) => {handleClose();handleLogout(e);}}>Logout</MenuItem>
        
      </Menu>
    </div>
  );
}
