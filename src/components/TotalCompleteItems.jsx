import { Typography, Box, Button } from "@mui/material";
import { useSelector } from "react-redux"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const TotalCompleteItems = ({displayTodos, display}) => {
	const todosLen = useSelector(state => state.todos.filter(s => s.completed).length)
	return (
	<Box sx={{py:3, display: 'flex', justifyContent: 'space-between'}}>
	<Typography sx={{pl:1, mt:2}} fontSize={13} variant='body1' color='primary.dark'>{todosLen} Completed</Typography>
	<Button variant="contained" sx={{width:200, color: 'primary.dark', backgroundColor: 'background.primary', "&:hover": {backgroundColor: 'background.primary'} }} onClick={() =>displayTodos(!display)} startIcon={display ? <VisibilityOffIcon /> : <VisibilityIcon /> }> {display ? "Hide todos" : "Show todos"} </Button>
	</Box>
	)
};

export default TotalCompleteItems;
