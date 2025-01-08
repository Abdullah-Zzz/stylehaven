import React, { useState } from "react";
import { Grid, Box, Paper, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Nav from "../Home/nav/nav";
import Footer from "../footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import FullScreenLoading from "../loadingComp/fullScreenloader";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  const tabs = [
    { id: "orders", label: "Track Orders" },
    { id: "account", label: "Account Settings" },
  ];

  return (
    <>
      <Nav />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: "100%", md: "25%" },
            bgcolor: "background.paper",
            p: 2,
            order: { xs: 1, sm: 0 }, // Moves sidebar to top on mobile
          }}
        >
          <Typography variant="h5" gutterBottom>
            Dashboard
          </Typography>
          <Box>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                fullWidth
                variant={activeTab === tab.id ? "contained" : "outlined"}
                color="primary"
                sx={{ mb: 1 }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            order: { xs: 2, sm: 1 }, // Keeps content section below sidebar on mobile
          }}
        >
          {activeTab === "orders" && <Orders />}
          {activeTab === "account" && <AccountSettings />}
        </Box>
      </Box>
      <Footer />
    </>
  );
};


const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [openModal, setOpenModal] = useState(false); // Modal visibility state
  const [orderIdToCancel, setOrderIdToCancel] = useState(null); // Order ID to cancel
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;

  const notify = (message) => toast(message);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${Backend_URL}/api/users/track/orders`, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });

      if (response.status === 200) {
        setOrders(response.data);
      } else if (response.status === 404) {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  // Handle Deleting Orders
  const handleDeletingOrders = async (ID) => {
    try {
      const res = await axios.post(`${Backend_URL}/api/users/delete/order/${ID}`, {}, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });
      if (res.status === 200) {
        notify(res.data.message);
        fetchOrders();
      } else {
        notify(res.data.message);
      }
    } catch (err) {
      console.error("Error canceling order:", err);
    }
  };

  // Open the confirmation modal
  const handleOpenModal = (ID) => {
    setOrderIdToCancel(ID);
    setOpenModal(true);
  };

  // Close the confirmation modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setOrderIdToCancel(null);
  };

  // Confirm cancellation of the order
  const handleConfirmCancel = () => {
    if (orderIdToCancel) {
      handleDeletingOrders(orderIdToCancel);
      handleCloseModal();
    }
  };

  return (
    <Box>
      {orders.length === 0 ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 6 }}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-10929688-8779494.png"
            alt="Empty Cart"
            style={{ width: "150px", height: "auto" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            You haven't placed any orders.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Your Orders
          </Typography>
          {orders.orders.map((order) => (
            <Paper key={order._id} sx={{ p: 2, mb: 2, position: "relative" }}>
              {/* <Typography
                variant="body2"
                // sx={{
                //   color: "red", fontWeight: "bold", cursor: "pointer", position: "absolute",
                //   top: "10px",
                //   right: "10px",
                //   fontSize: "12px",
                // }
                className="justify-end text-red-600 hidden"
                onClick={() => handleOpenModal(order._id)} 

              >
                Cancel
              </Typography> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  {Object.keys(order.itemID).map((itemId) => {
                    const item = orders.orderedItems.find((item) => item.id === parseInt(itemId));
                    if (!item) return null;

                    const itemQuantity = order.itemID[itemId].qty;
                    const itemSize = order.itemID[itemId].size;
                    return (
                      <Box key={itemId} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <img
                          src={item.image}
                          alt={item.type}
                          style={{ width: "50px", height: "50px", marginRight: "10px", objectFit: "cover" }}
                        />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            {item.type}
                          </Typography>
                          <Typography variant="body2">Size: {itemSize}</Typography>
                          <Typography variant="body2">Quantity: {itemQuantity}</Typography>
                          <Typography variant="body2">Date: {order.date}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center", marginTop: "50px" }}>
                <Typography
                variant="body2"
                className="border-2 border-red-600 justify-end text-red-600 inline px-2 py-[7px] rounded-sm cursor-pointer"
                onClick={() => handleOpenModal(order._id)} 
              >
                Cancel
              </Typography>
                  <Button
                    variant="outlined"
                    color={
                      order.status.toLowerCase() === "delivered"
                        ? "success"
                        : order.status.toLowerCase() === "shipped"
                          ? "info"
                          : "warning"
                    }
                    sx={{ width: "80%", marginLeft:"20px"}}
                  >
                    {order.status}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      )}

      {/* Confirmation Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Are you sure you want to cancel this order?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This action cannot be undone. Please confirm if you'd like to proceed with canceling the order.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

const AccountSettings = () => {
  const [password, setPassword] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const notify = (message) => toast(message);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${Backend_url}/api/users/change/password`, password, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });
      setLoading(false);
      if (res.status === 200) {
        notify(res.data.message);
        setPassword({
          currentPass: "",
          newPass: "",
          confirmPass: "",
        });
        fetchUserDetails();
        
      } else {
        notify(res.data.message);
      }
    } catch (err) {
      notify(err);
    }
  };

  const handleNameChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${Backend_url}/api/users/change/name`, { name }, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });
      setLoading(false);
      if (res.status === 200) {
        notify(res.data.message);
        fetchUserDetails();
        setName("");
      } else {
        notify(res.data.message);
      }
    } catch (err) {
      notify(err);
    }
  };

  const handlePhoneChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${Backend_url}/api/users/change/phone`, { phone }, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });
      setLoading(false);
      if (res.status === 200) {
        notify(res.data.message);
        fetchUserDetails();
        setPhone("");
      } else {
        notify(res.data.message);
      }
    } catch (err) {
      notify(err);
    }
  };
  

  const [userDetails, setUserDetails] = React.useState();

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`${Backend_url}/api/users/details`, {
        validateStatus: (status) => status < 500,
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserDetails(res.data);
      }
    } catch (err) {
      notify("An error has occurred");
    }
  };

  React.useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      {loading && <FullScreenLoading />}
      <Typography variant="h5" gutterBottom>
        Account Settings
      </Typography>

      {/* Update Name */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Name
        </Typography>
        <form onSubmit={handleNameChange}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={false}
            sx={{ mb: 2 }}
            placeholder={userDetails && userDetails.name}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Name
          </Button>
        </form>
      </Paper>

      {/* Update Phone */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Update Phone
        </Typography>
        <form onSubmit={handlePhoneChange}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={userDetails && userDetails.phone}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save Phone Number
          </Button>
        </form>
      </Paper>

      {/* Change Password */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={handlePasswordChange}>
          <TextField
            fullWidth
            label="Current Password"
            variant="outlined"
            type="password"
            name="currentPass"
            value={password.currentPass}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="New Password"
            variant="outlined"
            type="password"
            name="newPass"
            value={password.newPass}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPass"
            value={password.confirmPass}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Change Password
          </Button>
        </form>
      </Paper>

      <ToastContainer />
    </Box>
  );
};

export default Dashboard;
