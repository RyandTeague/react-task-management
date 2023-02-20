import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [noDeadline, setNoDeadline] = useState(false);

  const addTodoHandler = e => {
    e.preventDefault();
    addTodo({
      title,
      description,
      completed: false,
      deadline: deadline ? deadline.toISOString() : null,
      noDeadline,
    });

    setTitle('');
    setDescription('');
    setDeadline(null);
    setNoDeadline(false);
  };

  return (
    <Form>
      <Form.Group controlId='title'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' placeholder='Enter Todo Title' onChange={e => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='description'>
        <Form.Label>Description</Form.Label>
        <Form.Control type='text' placeholder='Enter Description' onChange={e => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='deadline'>
        <Form.Label>Deadline</Form.Label>
        <DatePicker
          selected={deadline}
          onChange={date => setDeadline(date)}
          dateFormat="MMMM d, yyyy"
          disabled={noDeadline}
          minDate={new Date()} // set minimum date to the current date
        />

        <Form.Check
          type='checkbox'
          label='No deadline'
          onChange={e => setNoDeadline(e.target.checked)}
        />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={addTodoHandler}>Add Todo</Button>
    </Form>
  );
};

export default AddTodo;
