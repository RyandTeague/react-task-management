import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import AddTodo from '../../components/AddToDo';
import Todo from '../../components/ToDo'; 
import { useCurrentUser } from '../../contexts/CurrentUserContext'; 

const TaskPage = () => {
  const [todos, setTodos] = useState([]); // initialize a state hook for todos 
  const currentUser = useCurrentUser(); // use the custom CurrentUserContext hook to get the current user 

  const getTodos = async () => { // async function to get todos from the server 
    try {
      const response = await axiosReq.get( // make a GET request using the custom axios request function 
        `https://task-backend.herokuapp.com/todos/?user=${currentUser.id}` // use the current user's ID to filter todos 
      );
      const { data } = response; // get the response data 
      setTodos(data); // update the todos state with the response data 
    } catch (err) { // handle errors 
      console.log(err);
    }
  };

  const addTodo = async (newTodo) => { // async function to add a new todo to the server 
    try {
      console.log(newTodo);
      await axiosRes.post( // make a POST request using the custom axios response function 
        'https://task-backend.herokuapp.com/todos',
        newTodo // send the newTodo object as the request body 
      );
      getTodos(); // update the todos state by calling the getTodos function 
      console.log('task sent');
      alert('Todo added successfully'); // show a success message to the user 
    } catch (error) { // handle errors 
      console.log(
        `An error occurred while adding a new todo: ${error.message}`
      );
      if (error.response) { // handle server responses with errors 
        console.log(
          `Server responded with status code ${error.response.status}`
        );
        console.log(
          `Response data: ${JSON.stringify(error.response.data)}`
        );
        alert(`Error: ${error.response.data}`);
      } else if (error.request) { // handle errors with no server response 
        console.log(`No response received from server: ${error.request}`);
        alert(`Error: No response received from server`);
      } else { // handle other errors 
        console.log(
          `An error occurred while setting up the request: ${error.message}`
        );
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className='wrapper'>
      <Container style={{backgroundColor: '#474B4F'}}>
        <Row className='justify-content-center pt-5'>
          <Col>
            <Card style={{backgroundColor: '#474B4F', border:"none"}} className='p-5'>
              <h3 style={{ color: 'gold' }}>My Todos</h3>
              <AddTodo addTodo={addTodo} /> {/* render the AddTodo component and pass the addTodo function as a prop */}
              {todos.map((todo, index) => ( // render each todo using the ToDo component 
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

export default TaskPage
