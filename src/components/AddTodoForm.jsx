import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { addTodoAsync } from '../redux/todoSlice'
import { Box, FormControl, TextField, Button, InputAdornment } from '@mui/material';
import { StyledTextFieldLight, StyledTextFieldDark } from './StyledTextField';
import SendIcon from '@mui/icons-material/Send';
const AddTodoForm = ({light}) => {
	const [value, setValue] = useState('');
	const jwt = localStorage.getItem("jwt")
	const userId = localStorage.getItem("userId")
	const sendTxt = "Add new note"
	const dispatch = useDispatch();
	const onSubmit = (event) => {
		event.preventDefault()
		dispatch(addTodoAsync({title: value, accessToken: jwt, userId: userId}))
		setValue("")
	};
	return (
		<>
		<form onSubmit={onSubmit}>
			<StyledTextFieldDark fullWidth sx={{ my: 2, display: light ? 'none' : 'block' }} inputProps={{sx: { height: 50 }}} value={value} onChange={(event) => setValue(event.target.value)} placeholder="New note" variant="outlined"InputProps={{
				endAdornment: (
					<InputAdornment position="end">
              <Button variant="contained" type='submit' sx={{ display: {xs: 'block', sm: 'none'}, height: 36, minWidth: 0, '& .MuiButtonBase-root': { width: '30px' } }}><SendIcon /></Button>
              <Button variant="contained" type='submit' sx={{textTransform:'unset', display: {xs: 'none', sm: 'block'}}}>{sendTxt}</Button>
            </InputAdornment>
          ),}} />
			<StyledTextFieldLight fullWidth sx={{ my: 2, display: light ? 'block' : 'none' }} inputProps={{sx: { height: 50 }}} value={value} onChange={(event) => setValue(event.target.value)} placeholder="New note" variant="outlined"InputProps={{
				endAdornment: (
					<InputAdornment position="end">
              <Button variant="contained" type='submit' sx={{ display: {xs: 'block', sm: 'none',color: 'primary.main', backgroundColor:'background.default'}, height: 36, minWidth: 0, '& .MuiButtonBase-root': { width: '30px' } }}><SendIcon /></Button>
              <Button variant="contained" type='submit' sx={{textTransform:'unset', display: {xs: 'none', sm: 'block'},color: 'primary.main', backgroundColor:'background.default'}}>{sendTxt}</Button>
            </InputAdornment>
          ),}} />
		</form>
		</>
	);
};

export default AddTodoForm;
