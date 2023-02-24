import React, { useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';

const Todo = ({ id, title, description, deadline, completeTodo, editTodo, deleteTodo }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDeadline, setNewDeadline] = useState(deadline);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTitle(title);
    setNewDescription(description);
    setNewDeadline(deadline);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleEditTodo = () => {
    const todo = {
      id,
      title: newTitle,
      description: newDescription,
      deadline: newDeadline,
    };

    editTodo(todo);
    handleCloseModal();
  };

  return (
    <>
      <Row className="border-bottom pt-3">
        <Col md={1}>
          <Form>
            <Form.Check
              type="checkbox"
              onChange={() => completeTodo(id)}
            />
          </Form>
        </Col>

        <Col>
          <h5>{title}</h5>
          <p>{description}</p>
          <p>{deadline ? (new Date(deadline) < new Date() ? <span style={{ color: 'red' }}>OVERDUE</span> : `Deadline: ${new Date(deadline).toLocaleString()}`) : null}</p>
        </Col>

        <Col md={2}>
          <Form>
            <Button variant="info" className="my-2 btn-block" onClick={handleShowModal}>Edit</Button>
          </Form>

          <Form>
            <Button variant="danger" className="my-2 btn-block" onClick={() => deleteTodo(id)}>Delete</Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newDeadline ? new Date(newDeadline).toISOString().substring(0, 16) : ''}
                onChange={(e) => setNewDeadline(new Date(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  ;
};

export default Todo;
