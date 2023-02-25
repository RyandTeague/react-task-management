// Importing required dependencies and components
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

// Defining the NavBar component
const NavBar = () => {
  // Fetching the current user and setCurrentUser function from CurrentUserContext
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Using a custom hook called useClickOutsideToggle to toggle the navbar when clicked outside
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Function to handle signing out
  const handleSignOut = async () => {
    try {
      // Making an axios post request to log out the user
      await axios.post("dj-rest-auth/logout/");
      // Setting the current user to null, and removing the token timestamp
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // Logging any errors that occur during the sign out process
      console.log(err);
    }
  };

  // Defining the icons that should be shown when the user is logged in
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  // Defining the icons that should be shown when the user is logged out
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  // Rendering the Navbar component with relevant props and children
  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <Navbar.Brand>
          <h1 className="ml-1" height="45">Task Manager</h1>
        </Navbar.Brand>
        {currentUser}
        {/* Toggle button to expand/collapse the Navbar */}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        {/* Collapsable section of Navbar with links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
