import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";
import ToDo from "../../components/ToDo";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import GroupList from "./GroupList";
import CreateGroup from "./CreateGroup"
import axios from "axios";
import moment from "moment";
import Cookies from 'js-cookie'


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(true);
  const [userGroups, setUserGroups] = useState([]);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [groupCreated, setGroupCreated] = useState(false);
  const [todos, setTodos] = useState([]); // initialize a state hook for todos 
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [totalCount, setTotalCount] = useState(0);
  

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile, setProfile] = useState({});
  // const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  console.log(todos)
  const fetchData = async () => {
    try {
      const pageProfile =
        await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          // axiosReq.get(`/groups/?members=${id}`), //There is no api like this in backend
        ]);
      // console.log(pageProfile)
      setProfile(pageProfile[0].data)
      // setProfileData((prevState) => ({
      //   ...prevState,
      //   pageProfile: { results: [pageProfile] },
      // }));
      // setUserGroups(groups.results);
      setHasLoaded(false);
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => { // useEffect hook to get todos on component mount
    getTodos();
  }, [loader]);

  const getTodos = async () => { // async function to get todos from the server 
    try {
      const response = await axiosReq.get( // make a GET request using the custom axios request function 
        `/todos/?owner=${id}` // use the current user's ID to filter todos 
        // `https://task-backend.herokuapp.com/todos/?owner=${id}` // use the current user's ID to filter todos 
      );
      const { data } = response; // get the response data 
      setTodos(data?.data); // update the todos state with the response data
      console.log('todos res data: ', data);
      setTodos(data?.data); // update the todos state with the response data
      setTotalCount(data?.total_elements)
    } catch (err) { // handle errors 
      console.log(err);
    }
  };
  

  const updateTodo = async (data) => {
    console.log('update data: ', data);
    const { id, deadline } = data;
    try {
      const config = {
        withCredentials: true,
        headers:{
          "X-CSRFToken": Cookies.get("csrftoken"),
        }
      };
      await axios
        .put(
          `/todos/${id}/`,
          {...data, deadline: deadline ? moment(deadline).format("YYYY-MM-DD HH:MM") : null,},
          config,
        )
        .then((response) => {
          console.log('todo update res data: ', response.data);
          setLoader(!loader);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(`An error occurred while adding a new todo: ${error}`);
      if (error.response) {
        console.log(`Response data: ${JSON.stringify(error.response.data)}`);
        alert(`Error: ${error.response.data}`);
      }
    }
  };

  const tasksCompleted = (
    <div>{profile?.todos_count - totalCount}</div>);

  const mainProfile = (
    <>
      {/* {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />} */}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.todos_count}</div>
              <div>Tasks Created</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{totalCount}</div>
              <div>Tasks in progress</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{tasksCompleted}</div>
              <div>Tasks completed</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
      <hr />
      <h3 className="text-center">Groups</h3>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <Asset spinner />
          ) : (
            <>
              {mainProfile}
            </>
          )}
        </Container>
        <Container className={appStyles.Content}>
          <GroupList groupCreated={groupCreated} />
          <CreateGroup groupCreated={groupCreated} setGroupCreated={setGroupCreated} />
        </Container>
      </Col>
      <Col lg={4} xs={12} className="p-0 p-lg-2">
        <Container className={appStyles.Content}>
          {Array.isArray(todos) && todos.length > 0 ? (
            todos.map((todo, index) => (
              // todo.completed && (
              <ToDo
                key={index}
                id={todo.id}
                owner={todo?.owner}
                title={todo.title}
                content={todo.content}
                deadline={todo.deadline}
                updateTodo={updateTodo}
              />
            ))
          ) : (
            <p>No todos found.</p>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;