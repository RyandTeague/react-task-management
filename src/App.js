import './App.css';
import AddTodo from './components/AddToDo';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect} from 'react'
import Todo from './components/ToDo';
import { axiosReq, axiosRes } from './api/axiosDefaults';

function App() {
	const [todos, setTodos] = useState([])

	const getTodos = async () => {
		try {
			const response = await axiosReq.get('https://task-backend.herokuapp.com/todo/')
			const { data } = response
			setTodos(data)
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	const addTodo = async newTodo => {
		try {
			console.log(newTodo);
			await axiosRes.post('https://task-backend.herokuapp.com/todo', newTodo);
			getTodos();
			console.log('task sent')
		} catch (error) {
			console.log(`An error occurred while adding a new todo: ${error.message}`);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(`Server responded with status code ${error.response.status}`);
				console.log(`Response data: ${JSON.stringify(error.response.data)}`);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(`No response received from server: ${error.request}`);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log(`An error occurred while setting up the request: ${error.message}`);
			}
		}
	}
	
/*
	const completeTodo = async id => {
		try {
			const todo = todos.filter(todo => todo.id === id)[0]
			todo.completed = true
			await axios.put(`https://task-backend.herokuapp.com/todo/${id}/`, todo)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	const editTodo = async todo => {
		try {
			await axios.put(`https://task-backend.herokuapp.com/todo/${todo.id}/`, todo)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}

	const deleteTodo = async id => {
		try {
			await axios.delete(`https://task-backend.herokuapp.com/todo/${id}/`)
			getTodos()
		} catch(err) {
			console.log(err)
		}
	}
*/
	return (
		<div className='wrapper'>
		<Container>
		  <Row className='justify-content-center pt-5'>
		    <Col>
		      <Card className='p-5'>
					  <h3>My Todos</h3>
					  <AddTodo addTodo={addTodo} />
					  {/*{todos.map((todo, index) => (
					  	!todo.completed && <Todo key={index} id={todo.id} title={todo.title} description={todo.description} completeTodo={completeTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
					  ))} */}
					</Card>
				</Col>
			</Row>
		</Container>
		</div>
	);
}

export default App;
