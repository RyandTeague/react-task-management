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
import ToDo from './components/ToDo';

function App() {
	const currentUser = useCurrentUser();
	const profile_id = currentUser?.profile_id || "";
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
						<Route path="/" element={<ToDo />} />
						<Route path="/signin" element={<SignInForm />} />
						<Route path="/signup" element={<SignUpForm />} />
						<Route path="/tasks" element={<TaskPage />} />
					</Routes>
				</ErrorBoundary>
			</Container>
		</div>
	);
}

export default App;
