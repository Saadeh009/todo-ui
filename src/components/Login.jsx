import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { Button, Box, Container, Typography, Grid, TextField } from '@mui/material'
import { StyledTextFieldDark } from "./StyledTextField";
import { useDispatch } from 'react-redux';
import { loginUserAsync } from '../redux/userSlice';
import { addToken } from '../redux/accessTokenSlice';

const Register = () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!email || !password) {
        alert("please fill in required fields")
        return
      }
      if (!validRegex.test(email)) {
        alert("invalid email")
        return
      }
      let user = await dispatch(loginUserAsync({email: email, password: password}))
      if (user.payload !== "user not found") {
        dispatch(addToken(user.payload.user.accessToken))
        const jwt = user.payload.user.accessToken
        const userId = user.payload.user.id
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("userId", userId);
        navigate('/todos', {
          state: {
            email: email,
            accessToken: user.payload.user.accessToken
          }
        })
      } else {
        alert("user not found")
      }
  }
  return (
      <Box  sx={{height: '100vh'}}>
    <Container>
        <Navbar />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' color={`rgba(244, 246, 250, 0.5)`} >
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: {xs: '65vw' , sm: '39vw', display: 'flex', flexDirection: 'column', alignItems: 'center'  } }}>
            <StyledTextFieldDark
              required
              fullWidth
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              sx={{ my: 3 }}
              inputProps={{sx: { height: 50}}}
            />
            <StyledTextFieldDark
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              sx={{ my: 3 }}
              inputProps={{sx: { height: 50}}}
            />
            <Typography variant='body2' fontSize={12} sx={{py: 1, color: `rgba(244, 246, 250, 0.5)`}}> Don’t have an account yet?<span style={{cursor: 'pointer'}}> <Link style={{color:`rgba(244, 246, 250, 0.5)`}} to={'/'}>Signup</Link> </span> </Typography>
            <Button
              type="Login"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '60%', textTransform: 'unset', height: '50px'  }}
            >
              Register
            </Button>
          </Box>
        </Box>
    </Container>
    </Box> 
  )
}

export default Register