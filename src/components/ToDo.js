import React from "react";
import styles from "../styles/ToDo.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../components/Avatar";
import { axiosRes } from "../api/axiosDefaults";
import { MoreDropdown } from "../components/MoreDropdown";

const ToDo = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    completed,
    deadline,
    title,
    content,
    updated_at,
    todoPage,
    setToDos,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
console.log(id)
  const handleEdit = () => {
    history.push(`/todos/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/todos/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.ToDo}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {/* {is_owner && todoPage && ( */}
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            {/* )} */}
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default ToDo;