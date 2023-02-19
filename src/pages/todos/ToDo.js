
import AddTodo from './components/AddToDo';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "./api/axiosDefaults";
import React, { useState, useEffect} from 'react'
import Todo from './components/ToDo';
import { axiosNew } from './api/axiosDefaults';

const [todos, setTodos] = useState([])

const getTodos = async () => {
    try {
        const response = await axiosNew.get('/drf-task-management/todos/')
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
        console.log(newTodo)
        await axiosNew.post('/drf-task-management/todos/', newTodo)
        getTodos()
    } catch (err) {
        console.log(err)
    }
}

const completeTodo = async id => {
    try {
        const todo = todos.filter(todo => todo.id === id)[0]
        todo.completed = true
        await axiosNew.put(`/drf-task-management/todos/${id}/`, todo)
        getTodos()
    } catch (err) {
        console.log(err)
    }
}

const editTodo = async todo => {
    try {
        await axiosNew.put(`/drf-task-management/todos/${todo.id}/`, todo)
        getTodos()
    } catch (err) {
        console.log(err)
    }
}

const deleteTodo = async id => {
    try {
        await axiosNew.delete(`/drf-task-management/todos/${id}/`)
        getTodos()
    } catch (err) {
        console.log(err)
    }
}

return (
    <div className='wrapper'>
        <Container>
            <Row className='justify-content-center pt-5'>
                <Col>
                    <Card className='p-5'>
                        <h3>My Todos</h3>
                        <AddTodo addTodo={addTodo} />
                        {todos.map((todo, index) => (
                            !todo.completed && <Todo key={index} id={todo.id} title={todo.title} description={todo.description} completeTodo={completeTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
                        ))}
                    </Card>
                </Col>
            </Row>
        </Container>