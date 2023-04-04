import React, { useState } from "react";
import styles from "../styles/ToDo.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import InputGroup from 'react-bootstrap/InputGroup';

import { Link, useHistory } from "react-router-dom";
import Avatar from "../components/Avatar";
import { axiosRes } from "../api/axiosDefaults";
import { MoreDropdown } from "../components/MoreDropdown";
import CheckboxWithLabel from "./CheckboxWithLabel";

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
    updateTodo,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner?.username;
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const handleEdit = () => {
    history.push(`/todos/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/todos/${id}/`);
      history.goBack();
    } catch (err) {
    }
  };

  return (
    <Card className={styles.ToDo}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            {owner?.username}
          </Link>
          <div className="d-flex align-items-center">
            <CheckboxWithLabel
              label="Is completed"
              checked={checked} 
              onChange={()=>{
                setChecked(true)
                setTimeout(()=>{
                  setChecked(false)
                  updateTodo({id, owner: owner?.id, title, deadline, completed: true})
                }, 1000);
              }} 
            />
            <span>{updated_at}</span>
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
  
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        {deadline && <Card.Text>{deadline}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default ToDo;