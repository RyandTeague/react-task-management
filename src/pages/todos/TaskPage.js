import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AddTodo from '../../components/AddToDo';
import Todo from '../../components/ToDo';

const TaskPage = ({ todos, addTodo }) => {
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
