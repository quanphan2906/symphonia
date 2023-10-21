// src/pages/signup.jsx
import React, { useState, useContext, useEffect } from "react";
import { Button, TextField, Grid, Paper, Typography, Link } from "@mui/material";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import { UserContext } from "@/context/UserContext";

function SignupPage() {
  const { user } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
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
    // Register user...
    // On success:
    // router.push('/');
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
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  label='First Name'
                  name='firstName'
                  value={credentials.firstName}
                  onChange={handleChange}
                  autoComplete='given-name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  label='Last Name'
                  name='lastName'
                  value={credentials.lastName}
                  onChange={handleChange}
                  autoComplete='family-name'
                />
              </Grid>
            </Grid>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Email Address'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              autoComplete='email'
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
              autoComplete='new-password'
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Verify Password'
              name='verifyPassword'
              type='password'
              value={credentials.verifyPassword}
              onChange={handleChange}
              autoComplete='new-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              style={{ marginTop: "1rem" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end' style={{ marginTop: "1rem" }}>
              <Grid item>
                <Link href='/auth/login' variant='body2'>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default SignupPage;
