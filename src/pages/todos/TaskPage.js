import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import AddTodo from '../../components/AddToDo';
import Todo from '../../components/ToDo';

const TaskPage = () => {
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
    <div className='wrapper'>
      <Container>
        <Row className='justify-content-center pt-5'>
          <Col>
            <Card className='p-5'>
              <h3>My Todos</h3>
              <AddTodo addTodo={addTodo} />
              {todos.map((todo, index) => (
                !todo.completed && (
                  <Todo
                    key={index}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                  />
                )
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TaskPage;
