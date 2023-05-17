import React from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TotalCompleteItems from './components/TotalCompleteItems';
import { Box, Button, Container, Paper, ThemeProvider, Typography } from "@mui/material";
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import TodoPage from './TodoPage';
const App = () => {

	return (
		<Routes>
			<Route path='/' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route path='/todos' element={
				<TodoPage />
			} />
		</Routes>
	);
};

export default App;
