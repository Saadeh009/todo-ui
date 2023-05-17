import { AppBar, Avatar, Box, ThemeProvider, Toolbar, Typography } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import React from 'react'
import { useLocation } from "react-router-dom";
const Navbar = ({toggleMode, light}) => {
  const loc = useLocation()
  const locName = loc.pathname.substring(1)
  return (
    <Box sx={{pt:10, paddingLeft: 0, position: 'relative', backgroundColor: 'background.default', color: 'primary.main', display: 'flex', justifyContent: 'space-between', alignItems: 'bottom', borderBottom: 1, borderColor: `rgba(244, 246, 250, 0.1)` }} elevation={0}>
      <Box>
        <Typography variant='h5' fontWeight={700}> TO DO APP </Typography>
        <Typography variant='body2' fontSize={12} sx={{py: 1, color: light ? '#23262C' : `rgba(244, 246, 250, 0.5)`}}> Stop Procrastinating , Start Organizing </Typography>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', gap: '0.66rem'}}>
      <Brightness4Icon sx={{fontSize:30}} onClick={() =>toggleMode(!light)} />
      <Avatar src={locName === 'todos' ? 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' : ""} />
      </Box>
    </Box>
  )
}

export default Navbar