import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/joy/Typography";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { auth, loginUser } from "../Config/FirebaseConfig";
import UserContext from "../Config/context";
import Loader from "../Components/Loader";

function Login() {
  const emailInput = useRef();
  const PasswordInput = useRef();

  const { loading, isloading } = useContext(UserContext);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function getData() {
    const email = emailInput.current.querySelector("input").value;
    const password = PasswordInput.current.querySelector("input").value;
    try {
      const userCredential = await loginUser(auth, email, password);

      const users = userCredential.user;
      if (users.email === "admin@gmail.com") {
        console.log(users.email);

        navigate("/admin/AllStudent");
        isloading(true);
      }

      if (users.email !== "admin@gmail.com") {
        navigate("/student-portal/Courses");
      }
    } catch (e) {
      alert(e.message);
      isloading(false);
    }
    // ...
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = emailInput.current.querySelector("input").value;
    const password = PasswordInput.current.querySelector("input").value;

    if (!email || !password) return;
    console.log("clided");
    isloading(true);
    getData();
  }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          maxWidth: "25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2rem",
          margin: "10% auto",
          textAlign: "center",
          padding: "0 .5rem",
        }}
      >
        <Typography level="h1">Login Form</Typography>

        <TextField
          ref={emailInput}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          ref={PasswordInput}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "#1976d2",

            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Did't Enrolled yet click here
        </Link>

        {loading ? (
          <Loader />
        ) : (
          <Button
            type="submit"
            sx={{
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              justify: "center",
            }}
            variant="contained"
          >
            Login
          </Button>
        )}
      </form>
    </div>
  );
}

export default Login;
