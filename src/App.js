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
import Signup from './pages/auths/SignUp';

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
	class ErrorBoundary extends React.Component {
		constructor(props) {
			super(props);
			this.state = { hasError: false, error: null };
		}

		static getDerivedStateFromError(error) {
			// Update state so the next render will show the fallback UI.
			return { hasError: true, error };
		}

		render() {
			if (this.state.hasError) {
				// You can render any custom fallback UI
				return <h1>Something went wrong: {this.state.error.message}</h1>;
			}

			return this.props.children;
		}
	}

	return (
		<div className={styles.App}>
			<NavBar />
			<Container className={styles.Main}>
				<ErrorBoundary>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/signin" element={<SignInForm />} />
						<Route path="/signup" element={<SignUpForm />} />
					</Routes>
				</ErrorBoundary>
			</Container>
		</div>
	);
}

export default App;
