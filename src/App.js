import './App.css';
import React, { useState, useEffect } from 'react';
import { axiosReq, axiosRes } from './api/axiosDefaults';
import TaskPage from './pages/todos/TaskPage';

function App() {
	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		try {
			const response = await axiosReq.get(
				'https://task-backend.herokuapp.com/todos/'
			);
			const { data } = response;
			setTodos(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	const addTodo = async (newTodo) => {
		try {
			console.log(newTodo);
			await axiosRes.post(
				'https://task-backend.herokuapp.com/todos',
				newTodo
			);
			getTodos();
			console.log('task sent');
			alert("Todo added successfully");
		} catch (error) {
			console.log(
				`An error occurred while adding a new todo: ${error.message}`
			);
			if (error.response) {
				console.log(
					`Server responded with status code ${error.response.status}`
				);
				console.log(`Response data: ${JSON.stringify(error.response.data)}`);
				alert(`Error: ${error.response.data}`);
			} else if (error.request) {
				console.log(`No response received from server: ${error.request}`);
				alert(`Error: No response received from server`);
			} else {
				console.log(
					`An error occurred while setting up the request: ${error.message}`
				);
				alert(`Error: ${error.message}`);
			}
		}
	};


	return <TaskPage todos={todos} addTodo={addTodo} />;
}

export default App;
