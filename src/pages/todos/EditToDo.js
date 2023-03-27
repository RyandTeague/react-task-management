import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import styles from "../../styles/ToDoAddEdit.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function EditToDo() {
  const [errors, setErrors] = useState({});

  const [todoData, setToDoData] = useState({
    title: "",
    content: "",
    deadline: null,
    completed: false,
  });
  const { title, content, deadline, completed, } = todoData;
  console.log(deadline);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/todos/${id}/`);
        const { title, content, deadline, completed, is_owner } = data;

        // is_owner
        //   ? 
          setToDoData({ title, content, deadline, completed })
          // console.log(moment(deadline).format('MM/DD/YYYY'))
         
          // : history.push("/");
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  const handleChange = (event) => {
    setToDoData({
      ...todoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDeadline = (date) => {
    setToDoData({
      ...todoData,
      deadline: date,
    });
  };

  const handleChangeCompleted = (event) => {
    setToDoData({
      ...todoData,
      completed: event.target.checked,
    });
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/todos/${id}/`);
      history.push("/todos/");
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  const formData = new FormData();
    // debugger

    formData.append("title", title);
    formData.append("content", content);
    formData.append("deadline", deadline);
    formData.append("completed", completed);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
console.log(formData)
    try {
      await axiosReq.put(`/todos/${id}/`, formData);
      // history.push(`/todos/${id}`);
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
        {errors?.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Form.Group>
        <Form.Label>Deadline</Form.Label>
        <br />
        <DatePicker
          // selected={deadline}
          // dateFormat="yyyy-MM-dd"
          onChange={(date) =>
            setToDoData({
              ...todoData,
              deadline: moment(date).format("YYYY-MM-DD HH:MM"),
            })
          }
          className="form-control"
          minDate={new Date()}
          //  minDate={moment().toDate()}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={10}
          placeholderText="Select a date"
        />
        {errors?.deadline?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Red}`}
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
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

export default EditToDo;