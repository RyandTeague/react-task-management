import React, { Component } from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: 1, title: 'Buy milk', deadline: '2023-02-20', completed: false },
                { id: 2, title: 'Do laundry', deadline: '2023-02-22', completed: false },
                { id: 3, title: 'Clean room', deadline: '2023-02-25', completed: false }
            ],
            newTodoTitle: '',
            newTodoDeadline: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newTodo = {
            id: Date.now(),
            title: this.state.newTodoTitle,
            deadline: this.state.newTodoDeadline,
            completed: false
        };
        this.setState({
            todos: [...this.state.todos, newTodo],
            newTodoTitle: '',
            newTodoDeadline: ''
        });
    }

    handleCheckboxChange = (id) => {
        const newTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.setState({ todos: newTodos });
    }

    handleDeleteClick = (id) => {
        const newTodos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({ todos: newTodos });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.todos.map(todo => (
                        <li key={todo.id}>
                            <input type="checkbox" checked={todo.completed} onChange={() => this.handleCheckboxChange(todo.id)} />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
                            <span> - Deadline: {todo.deadline}</span>
                            <button onClick={() => this.handleDeleteClick(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" name="newTodoTitle" value={this.state.newTodoTitle} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Deadline:
                        <input type="date" name="newTodoDeadline" value={this.state.newTodoDeadline} onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default TodoList;