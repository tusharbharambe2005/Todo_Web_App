import axios from "axios";
import { useEffect, useState } from "react";
//import all material
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button'; 
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import './CreateTodo.css';

const CreateTodo = () => {
    //create State
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [title, setTitle] = useState("");//this are set the Title
    const [description, setDescription] = useState("");//this are set the Descriptions
    const [todos, setTodos] = useState([]);//this are set the All todo 
    const [username, setUsername] = useState('');//this are set the  Display the user name
    const [error, setError] = useState(null);

    //fetching the todo to api
    const fetchTodos = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/todo/todos/",//api to fetch todo
                {
                    headers: {
                        Authorization: `Bearer ${token}`//set the headers to Authorizations token
                    },
                }
            );
            setTodos(response.data);//set the Todo data
            if (response.data.length > 0) {
                setUsername(response.data[0].user);//get and set the username
            }
            // console.log("Todos fetched:", response.data);//print console all data 
        } catch (e) {
            console.log('Not authenticated');

        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);// you tell React that your component needs to do something after render

    //handleTod are use to submit the form  then display to task card
    const handleTodo = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/todo/todos/",
                {
                    title,
                    description,
                    completed: false
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setTodos([...todos, response.data]);//set all data to Todos then display task card
            setTitle('');
            setDescription('');
            console.log("Todo added:", response.data);
        } catch (err) {
            console.error(err);
        }
    };

    //this handler functions are used to handle the completed task and the text are line-through
    const handleDoneTaskTodo = async (id) => {
        const token = localStorage.getItem('access_token');
        const todo = todos.find(t => t.id === id);
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/todo/todos/${id}/`,
                {
                    ...todo,
                    completed: !todo.completed
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
                
            );
            console.log("Todo updated:")
            setTodos(todos.map(t => t.id === id ? response.data : t));
            setError(null);
            console.log("Todo updated:", response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to update the task. Please try again.");
        }
    };

    //this function are used to handle the task delete
    const handleDeleteTodo = async (id) => {
        const token = localStorage.getItem('access_token');
            
            if (!token) {
                console.log('No token found');
                return;
            }
        try{
            const response = await axios.delete(
                `http://127.0.0.1:8000/todo/delete/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setTodos(todos.filter(t => t.id !== id));
            console.log("Task deleted");
        } catch (err) {
            console.error(err);
        }
        console.log("click")
    }
    const handleLogout=()=>{
        localStorage.clear()
    }

    return (
        <div>
            <Button 
                variant="outlined"  
                color="error" 
                onClick={handleLogout}
                >
                Logout
                </Button>
                {error && <Alert severity="error">{error}</Alert>}   
        <div className="todo-container">
            <h2>{`User: ${username}`}</h2>
            
            <form className="todo-form" onSubmit={handleTodo}>
                <div>
                    <TextField
                        id="title"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        variant="outlined"
                    />
                </div>
                <br />
                <div>
                    <TextField
                        id="standard-multiline-static"
                        label="Todo Description"
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        variant="standard"
                    />
                </div>
                <br />
                <Button 
                    type="submit" 
                    variant="contained" 
                    endIcon={<SendIcon />}>
                Add Todo
                </Button>
            </form>
            <ul>
            {todos.map(todo => (
                    <li key={todo.id}>
                        <h2>{todo.title}</h2>
                        <span style={todo.completed ? { textDecorationLine: "line-through" } : {}}>
                            {todo.description}
                        </span>
                        {/* <Checkbox
                            {...label}
                            checked={todo.completed}
                            onChange={() => handleDoneTaskTodo(todo.id)}
                        /> */}
                        <input type="checkbox" checked={todo.completed} onChange={()=>handleDoneTaskTodo(todo.id)} />
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteTodo(todo.id)}>
                            Delete
                        </Button>
                    </li>
                ))}
            </ul>
            
        </div>
        </div>
    );
}

export default CreateTodo;
