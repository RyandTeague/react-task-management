import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTodo = ({ addTodo, user }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState(null);

  const addTodoHandler = e => {
    e.preventDefault();
    addTodo({
      title,
      content,
      completed: false,
      deadline: deadline ? deadline.toISOString() : null,
    });

    setTitle('');
    setContent('');
    setDeadline(null);
  };

  return (
    <Form style={{ backgroundColor: "#1c1c1c", padding: "10px", borderRadius: "2px", border: "1px solid #383838" }}>
      <Form.Group controlId='title'>
        <Form.Label style={{ color: "#c9c9c9" }}>Title</Form.Label>
        <Form.Control type='text' placeholder='Enter Todo Title' onChange={e => setTitle(e.target.value)} style={{ backgroundColor: "#1c1c1c", color: "#c9c9c9", borderRadius: "5px", border: "2px solid #383838", fontSize: "1.2rem", padding: "0.5rem", marginBottom: "1rem", width: "100%" }} />
      </Form.Group>

      <Form.Group controlId='content'>
        <Form.Label style={{ color: "#c9c9c9" }}>Content</Form.Label>
        <Form.Control as='textarea' placeholder='Enter Content' onChange={e => setContent(e.target.value)} style={{ backgroundColor: "#1c1c1c", color: "#c9c9c9", borderRadius: "5px", border: "2px solid #383838", fontSize: "1.2rem", padding: "0.5rem", marginBottom: "1rem", width: "100%" }} />
      </Form.Group>

      <Form.Group controlId='deadline'>
        <Form.Label style={{ color: "#c9c9c9" }}>Deadline</Form.Label>
        <DatePicker
          selected={deadline}
          onChange={date => setDeadline(date)}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()} // set minimum date to the current date
          style={{ marginBottom: "1rem", width: "100%" }}
        />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={addTodoHandler} style={{ backgroundColor: "#31b0d5", borderRadius: "5px", border: "none", width: "100%" }}>Add Todo</Button>
    </Form>
  );
};

export default AddTodo;
