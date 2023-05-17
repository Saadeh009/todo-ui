import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import AddTodoForm from './components/AddTodoForm';
import { theme } from './theme';
import TotalCompleteItems from './components/TotalCompleteItems';
const TodoPage = () => {
  const [display, setDisplay] = useState(true)
  const [light, setLight] = useState(false)
  function displayTodos() {
    setDisplay((currentDisplay)=> !currentDisplay)
  }
  function toggleMode() {
    setLight((currentLight)=> !currentLight)
  }
  const lightTheme = createTheme({
		palette: {
      primary: {
        main: '#23262C',
        dark: '#8C8E93'
      },        
      secondary: {
        main:'rgba(244, 246, 250, 0.5)'
      },
		  background:{
        default: '#F4F6FA',
        primary: '#B4B4B4',
      }
		},
    typography: {
      fontFamily: 'Poppins'
  }
	  });
    // theme={lightTheme}
  return (
    <ThemeProvider theme={light ? lightTheme : theme}> 
    <CssBaseline />
    <Box sx={{height: '100vh'}}>
    <Container>
        <Navbar toggleMode={toggleMode} light={light} />
        <TotalCompleteItems displayTodos={displayTodos} display={display} />
        <TodoList display={display} />
        <AddTodoForm light={light} />
    </Container>
    </Box>
    </ThemeProvider>
  )
}

export default TodoPage