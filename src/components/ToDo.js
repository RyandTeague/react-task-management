import React, { useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';

const Todo = ({ id, title, description, completeTodo, editTodo, deleteTodo }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTitle(title);
    setNewDescription(description);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleEditTodo = () => {
    const todo = {
      id,
      title: newTitle,
      description: newDescription,
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
};

export default Todo;
