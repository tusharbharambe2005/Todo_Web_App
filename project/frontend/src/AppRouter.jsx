import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateTodo from './components/CreateTodo';


function AppRouter() {
  

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO APP
          </Typography>
          <Button color="inherit" component={Link} to="/CreateTodo">Todo</Button>
          <Button color="inherit" component={Link}  to="/">Login</Button>
          <Button color="inherit" component={Link} to="/signup">Signup</Button>
          
          
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/CreateTodo" element={<CreateTodo />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          
          {/* <Route path="/" element={<CreateTodo />} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default AppRouter;
