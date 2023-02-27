import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import ToDo from "./ToDo";

import PopularProfiles from "../profiles/PopularProfiles";

function ToDoPage() {
  const { id } = useParams();
  const [todo, setToDo] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: todo }] = await Promise.all([
          axiosReq.get(`/todos/${id}`),
        ]);
        setToDo({ results: [todo] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <ToDo {...todo.results[0]} setToDos={setToDo} todoPage />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ToDoPage;