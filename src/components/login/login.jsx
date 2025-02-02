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

export default function Login() {
  const navigate = useNavigate();
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = React.useState(false);

  const [PostData, setPostData] = React.useState({
    email: "",
    password: "",
  });

  const notify = (str) => {
    toast(str);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${Backend_URL}/api/users/login/`, PostData, {
        validateStatus: (status) => {
          return status < 500;
        },
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          navigate("/");
          location.reload();
        } else {
          notify(res.data.message);
        }
      })
      .catch(() => {
        setLoading(false);
        notify("An error has occurred while sending the request");
      });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            marginTop: 10,
            marginBottom: 10,
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
            Login
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
            <Typography
              variant="body2"
              sx={{
                textAlign: "right",
                color: "#1976d2",
                textDecoration: "none",
                cursor: "pointer",
                mt: -1,
                fontFamily : "kanit"

              }}
              component={Link}
              to="/resetpass"
            >
              Forgot Password?
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, mt: 2,fontFamily:"kanit" }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center",fontFamily:"kanit" }}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
              Register Here
            </Link>
          </Typography>
        </Container>
        <Footer />
      </Box>
      <ToastContainer />
    </>
  );
}
