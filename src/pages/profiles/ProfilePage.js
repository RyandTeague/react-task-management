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
  const [hasLoaded, setHasLoaded] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const [errors, setErrors] = useState({});  const [todos, setTodos] = useState([]); // initialize a state hook for todos 
  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: groups }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/groups/?members=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setUserGroups(groups.results);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  useEffect(() => { // useEffect hook to get todos on component mount
    getTodos();
  }, []);

  const getTodos = async () => { // async function to get todos from the server 
    try {
      const response = await axiosReq.get( // make a GET request using the custom axios request function 
        `https://task-backend.herokuapp.com/todos/?owner={currentUser.id}` // use the current user's ID to filter todos 
      );
      const { data } = response; // get the response data 
      setTodos(data); // update the todos state with the response data
      console.log(data); 
    } catch (err) { // handle errors 
      console.log(err);
    }
  };

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
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
      <Container>
        <Row>
          <Col>
            <h5>Groups that {profile?.owner} is a member of:</h5>
            {profile?.groups.length > 0 ? (
              <ul>
                {profile?.groups.map((group) => (
                  <li key={group.id}>{group.name}</li>
                ))}
              </ul>
            ) : (
              <p>{profile?.owner} is not a member of any group.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
  
  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
        <GroupList />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      {Array.isArray(todos) && todos.length > 0 ? (
                todos.map((todo, index) => (
                  !todo.completed && (
                    <ToDo
                      key={index}
                      id={todo.id}
                      title={todo.title}
                      description={todo.description}
                      deadline={todo.deadline}
                    />
                  )
                ))
              ) : (
                <p>No todos found.</p>
              )}
      </Col>
    </Row>
  );
}

export default ProfilePage;