// Importing required modules and components
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";

// Defining a component called ThreeDots, which is a forwardRef
// This component will be used to create the dropdown toggle button
// The ref attribute is used to get access to the DOM node, which is needed to position the menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// Defining a component called MoreDropdown, which is a Dropdown component from react-bootstrap
// This component receives two props, handleEdit and handleDelete, which are functions that will be called when the corresponding dropdown items are clicked
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      {/* Using the ThreeDots component as the dropdown toggle */}
      <Dropdown.Toggle as={ThreeDots} />

      {/* The Dropdown.Menu component contains the dropdown items */}
      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Defining a component called ProfileEditDropdown, which is a Dropdown component from react-bootstrap
// This component receives a prop called id, which will be used to construct the URLs for the dropdown items
export const ProfileEditDropdown = ({ id }) => {
  // Using the useHistory hook from react-router to get access to the browser history object
  const history = useHistory();

  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      {/* Using the ThreeDots component as the dropdown toggle */}
      <Dropdown.Toggle as={ThreeDots} />

      {/* The Dropdown.Menu component contains the dropdown items */}
      <Dropdown.Menu>
        <Dropdown.Item
          // Using the history object to navigate to the edit profile page for the user with the given id
          onClick={() => history.push(`https://task-backend.herokuapp.com/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          // Using the history object to navigate to the edit username page for the user with the given id
          onClick={() => history.push(`https://task-backend.herokuapp.com/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          // Using the history object to navigate to the edit password page for the user with the given id
          onClick={() => history.push(`https://task-backend.herokuapp.com/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
