import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import { axiosReq, axiosRes } from './api/axiosDefaults';
import TaskPage from './pages/todos/TaskPage';
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auths/SignUpForm";
import SignInForm from "./pages/auths/SignInForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import HomePage from './pages/auths/HomePage';

function App() {
	const currentUser = useCurrentUser();
	const profile_id = currentUser?.profile_id || "";
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

	return (
		<div className={styles.App}>
			<NavBar />
			<Container className={styles.Main}>
				<TaskPage todos={todos} addTodo={addTodo} />
			</Container>
		</div>
	);
}

export default App;
