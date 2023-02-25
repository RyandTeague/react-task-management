import React from "react";
import styles from "../styles/Avatar.module.css";

/* This defines a functional component named Avatar 
that receives three props: src, height, and text. 
src is the URL of the image to display, height is 
the height of the image in pixels, and text is an 
optional text to display below the image. */
const Avatar = ({ src, height = 45, text }) => {
  //This is the JSX code returned by the Avatar component.
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;