import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import Snackbar from "@/components/Snackbar";

import Header from "@/components/Header";
import { UserContext } from "@/context/UserContext";

function LoginPage() {
  const { user, login } = useContext(UserContext); // Extract login method from context
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // State to hold any login errors
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect to home if user is already logged in
    }
  }, [user, router]);

  const handleSignupClick = () => {
    router.push("/auth/signup");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const response = await login({ email, password }); // Call the login method from context
    if (response.success) {
      router.push("/"); // Redirect to dashboard on successful login
    } else {
      setError(response.error.message); // Set error state if login failed
    }
  };

  return (
    <div>
      <Header />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Paper elevation={4} style={{ padding: "2rem" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Sign In
            </Button>
            <Grid
              container
              justifyContent="flex-end"
              style={{ marginTop: "1rem" }}
            >
              <Grid item>
                <Link
                  onClick={handleSignupClick}
                  component="button"
                  variant="body2"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <Snackbar message={error} setMessage={setError} status="error" />
    </div>
  );
}

export default LoginPage;
