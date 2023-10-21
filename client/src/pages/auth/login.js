import React, { useEffect, useState, useContext } from "react";
import { Button, TextField, Grid, Paper, Typography, Link } from "@mui/material";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { UserContext } from "@/context/UserContext";

function LoginPage() {
  const { user } = useContext(UserContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect to home if user is already logged in
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authenticate user...
    // On success:
    // router.push('/dashboard');
  };

  return (
    <div>
      <Header />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{ height: "calc(100vh - 64px)" }}
      >
        <Paper elevation={4} style={{ padding: "2rem" }}>
          <Typography variant='h5' align='center' gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Email Address'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Password'
              name='password'
              type='password'
              value={credentials.password}
              onChange={handleChange}
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              style={{ marginTop: "1rem" }}
            >
              Sign In
            </Button>
            <Grid container justifyContent='flex-end' style={{ marginTop: "1rem" }}>
              <Grid item>
                <Link href='/auth/signup' variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default LoginPage;
