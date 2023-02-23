import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults"

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosReq.post(
        "/dj-rest-auth/registration/",
        formData
      );
      setSuccess(true);
      setError(null);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setError(error.response.data);
        setSuccess(false);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        setError("Server is not responding. Please try again later.");
        setSuccess(false);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        setError("Something went wrong. Please try again later.");
        setSuccess(false);
      }
    }
  };


  return (
    <div className={styles.formWrapper}>
      <Container>
        <Row className={styles.formRow}>
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <h2 className={appStyles.title}>Sign Up</h2>
            {error && <Alert variant="danger">{error && error.detail}</Alert>}
            {success && (
              <Alert variant="success">
                Successfully registered! Please check your email to confirm
                your account.
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={formData.password1}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className={btnStyles.primaryBtn}
              >
                Sign Up
              </Button>
            </Form>
            <p className={styles.formBottom}>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;
