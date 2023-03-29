import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AddTodo from "../../components/AddToDo";
import ToDo from "../../components/ToDo";
import {
  useCurrentTokken,
  useCurrentUser,
} from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { axiosRes } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { Prev } from "react-bootstrap/esm/PageItem";
import axios from "axios";
import Cookies from "js-cookie";

const TaskPage = () => {
  // useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [todos, setTodos] = useState([]); // initialize a state hook for todos
  const currentUser = useCurrentUser(); // use the custom CurrentUserContext hook to get the current user
  const { currentTokken, setTokken } = useCurrentTokken();
  const [loader, setLoader] = useState(true);
  // console.log(currentTokken);
  // axios.defaults.withCredentials = currentTokken;
  const getTodos = async () => {
    // async function to get todos from the server
    try {
      // console.log('test') // if this is deleted the tasks dissapear
      const response = await axiosReq.get(
        // make a GET request using the custom axios request function
        `https://task-backend.herokuapp.com//todos/?profile_id=${currentUser.profile_id}` // use the current user's ID to filter todos
      );
      const {
        data: { results },
      } = response; // get the response data
      // console.log(results)
      setTodos(results); // update the todos state with the response data
    } catch (err) {
      // handle errors
      console.log(err);
    }
  };

  useEffect(() => {
    // useEffect hook to get todos on component mount
    getTodos();
    setLoader(false);
  }, [loader]);

  const addTodo = async (newTodo) => {
    // async function to add a new todo to the server
    try {
      // debugger
      // await axios.post( // make a POST request using the custom axios response function
      //   'https://task-backend.herokuapp.com//todos/',
      //   { withCredentials: true },

      //   JSON.stringify(newTodo),
      //   // {headers: {
      //   //   'content-type': 'application/json',
      //   //   'csrfmiddlewaretoken': Cookies.get('csrftoken'),
      //   //   // 'X-CSRFToken': Cookies.get('csrftoken'),
      //   //   },
      //   // },
      //   // {
      //   // cookies:{
      //   //   'sessionid':'2z2ob0i3nrgotqzfr17ydqnturgrk2vc '
      //   // }}// send the newTodo object as the request body
      // );
      // const abc = await fetch("http://127.0.0.1:8000/todos/", {
      //   credentials: 'same-origin',
      //   method:'POST',
      //   headers:{
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body:JSON.stringify(newTodo)
      // })
      // const config = {
      //   headers: {
      //     "X-CSRFToken": Cookies.get("csrftoken"),
      //     // Cookie: `csrftoken=${Cookies.get(
      //     //   "csrftoken"
      //     // )}; sessionid=${currentTokken}`,
      //   },
      // };
      const config = {
        withCredentials: true,
        headers:{
          "X-CSRFToken": Cookies.get("csrftoken"),
        }
      };
      // console.log()
      await axiosReq
        .post(
          "/todos/",
          // axios.defaults.headers.post['Cookie'] = currentTokken,
          newTodo,
          config
          // {
          //   headers: {
          //     'X-CSRFToken':  Cookies.get('csrftoken'),
          //     Cookie:`sessionid=${currentTokken}`,
          //     // cookie: currentTokken,

          //   },
          //   },
          // {withCredentials: true},
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setTodos((prev) => [newTodo, ...prev]);
      // console.log('task sent');
      // alert("Todo added successfully");
      setLoader(true);
      // show a success message to the user
    } catch (error) {
      // handle errors
      console.log(`An error occurred while adding a new todo: ${error}`);
      if (error.response) {
        // handle server responses with errors
        console.log(
          `Server responded with status code ${error.response.status}`
        );
        console.log(`Response data: ${JSON.stringify(error.response.data)}`);
        alert(`Error: ${error.response.data}`);
      } else if (error.request) {
        // handle errors with no server response
        console.log(`No response received from server: ${error.request}`);
        alert(`Error: No response received from server`);
      } else {
        // handle other errors
        console.log(
          `An error occurred while setting up the request: ${error.message}`
        );
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="wrapper">
      <Container style={{ backgroundColor: "#474B4F" }}>
        <Row className="justify-content-center pt-5">
          <Col>
            <Card
              style={{ backgroundColor: "#474B4F", border: "none" }}
              className="p-5"
            >
              <h3 style={{ color: "gold" }}>My Todos</h3>
              <AddTodo addTodo={addTodo} />
              {/* render the AddTodo component and pass the addTodo function as a prop */}
              {/* add a condition to check if todos is an array before using map */}
              {todos.map(
                (todo, index) =>
                  !todo.completed && (
                    <ToDo
                      key={index}
                      id={todo.id}
                      profile_id={todo.profile_id}
                      title={todo.title}
                      content={todo.content}
                      deadline={todo.deadline}
                    />
                  )
              )}
              {!todos.length && <p>No todos found.</p>}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TaskPage;
