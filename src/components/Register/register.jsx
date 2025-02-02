import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullScreenLoading from "../loadingComp/fullScreenloader";
import Footer from "../footer/footer";
import Nav from "../Home/nav/nav";
import { Box, Button, TextField, Typography, Container, CircularProgress } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = React.useState(false);

  const [PostData, setPostData] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const notify = (str) => {
    toast(str);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${Backend_URL}/api/users/register/`, PostData, {
        validateStatus: (status) => status < 500,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          const msg = `Link Sent to ${PostData.email}`;
          notify(msg);
          setTimeout(() => {
            navigate("/login");
            location.reload();
          }, 3000);
        } else {
          notify(res.data.message);
        }
      })
      .catch(() => {
        setLoading(false);
        notify("An error occurred while sending the request.");
      });
  }

  return (
    <>
      {loading ? <FullScreenLoading /> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#f4f4f4",
        }}
      >

        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "white",
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
            marginTop:10,
            marginBottom:10
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: "bold",
              textAlign: "center",
              fontFamily : "kanit"  

            }}
          >
            Register
          </Typography>
          <form
            method="POST"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TextField
              label="Username"
              type="text"
              name="name"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setPostData({ ...PostData, name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setPostData({ ...PostData, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setPostData({ ...PostData, password: e.target.value })}
            />
            <TextField
              label="Phone Number"
              type="text"
              name="phone"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setPostData({ ...PostData, phone: String(e.target.value) })}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, mt: 2, fontFamily:"kanit" }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center", fontFamily:"kanit" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
              Login Here
            </Link>
          </Typography>
        </Container>
      <Footer />

      </Box>
      <ToastContainer />
    </>
  );
}
