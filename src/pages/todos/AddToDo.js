import React, { useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/ToDoAddEdit.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function AddToDo() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [todoData, setToDoData] = useState({
    title: "",
    content: "",
    deadline: null,
    completed: false,
  });
  const { title, content, deadline, completed } = todoData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setToDoData({
      ...todoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const todoData = {
      title,
      content,
      deadline: null,
      completed: false,
    };

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("deadline", null);
    formData.append("completed", false);

    try {
      const { data } = await axiosReq.post("/todos/", formData);
      history.push(`/todos/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId='deadline'>
        <Form.Label style={{ color: "#c9c9c9" }}>Deadline</Form.Label>
        <DatePicker
          selected={deadline}
          onChange={handleChange}
          dateFormat="MMMM d, yyyy"
          minDate={new Date()} // set minimum date to the current date
          style={{ marginBottom: "1rem", width: "100%" }}
        />
        </Form.Group>

        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={() => history.goBack()}
        >
          cancel
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
          create
        </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default AddToDo;