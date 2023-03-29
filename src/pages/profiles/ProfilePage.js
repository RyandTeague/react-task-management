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
import CreateGroup from "./Group"

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(true);
  const [userGroups, setUserGroups] = useState([]);
  const [errors, setErrors] = useState({});
  const [todos, setTodos] = useState([]); // initialize a state hook for todos 
  const currentUser = useCurrentUser();
  const { id } = useParams();

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
  }, []);

  const getTodos = async () => { // async function to get todos from the server 
    try {
      const response = await axiosReq.get( // make a GET request using the custom axios request function 
        `https://task-backend.herokuapp.com/todos/?owner=${id}` // use the current user's ID to filter todos 
      );
      const { data } = response; // get the response data 
      setTodos(data.results); // update the todos state with the response data
      // console.log(data); 
    } catch (err) { // handle errors 
      console.log(err);
    }
  };

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
              <div>todos</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
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
          <GroupList />
          <CreateGroup />
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
                title={todo.title}
                content={todo.content}
                deadline={todo.deadline}
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