import React, { useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import {
  CurrentUserContext,
  useCurrentUser,
} from "../../contexts/CurrentUserContext";
import Select from "react-select";
import axios from "axios";
import Cookies from "js-cookie";
const CreateGroup = ({ group }) => {
  const currentUser = useCurrentUser();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState([]);
  
  // console.log(profile);
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      // debugger
      const config = {
       withCredentials:true,
       headers:{
        "X-CSRFToken": Cookies.get("csrftoken"),
      }
      };
      const response = await axiosReq.post("https://task-backend.herokuapp.com/groups/", {
        name: groupName,
        members:members, // add the creator ID to the members array
      },
      config
      );
      setMessage(`Group "${response.data.name}" created successfully!`);
    } catch (error) {
      setMessage("There was a problem creating the group.");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosRes.patch(
        `https://task-backend.herokuapp.com/groups/${group.id}/`,
        {
          members: [...members, newMember],
        }
      );
      setMembers(response.data.members);
      setNewMember("");
      setMessage(`Member "${newMember}" added successfully!`);
    } catch (error) {
      setMessage("There was a problem adding the member.");
    }
  };
  const fetchData = async () => {
    try {
      const pageProfile = await Promise.all([axiosReq.get(`/profiles/`)]);
      setProfile(pageProfile[0].data.results);
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange1 = (e) => {
    setMembers(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
let options = profile.map(function (user) {
  return { value: user.id, label: user.owner };
})
  return (
    <div>
        
      {/* Group */}
      {/* <h2>{group.name}</h2>
            <ul>
                {group.members.map((member) => (
                    <li key={member.id}>{member.username}</li>
                ))}
            </ul> */}
      <form style={{ backgroundColor: "#1c1c1c", padding: "10px", borderRadius: "2px", border: "1px solid #383838" }} onSubmit={handleCreateGroup}>
        <label style={{ color: "#c9c9c9" }}>
          Group name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>
      
        <label style={{ color: "#c9c9c9" }}>
          Members:
          <Select
          isMulti
          options={options}
          onChange={handleChange1}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        </label>
        
        <button style={{ backgroundColor: "#31b0d5", borderRadius: "5px", border: "none", width: "100%" }} type="submit">Create group</button>
      </form>
      {message && <p>{message}</p>}
      <hr />
      <h3>Add member</h3>
      <form style={{ backgroundColor: "#1c1c1c", padding: "10px", borderRadius: "2px", border: "1px solid #383838" }} onSubmit={handleAddMember}>
        <label style={{ color: "#c9c9c9" }}>
          Search for a user:
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
        </label>
        <button style={{ backgroundColor: "#31b0d5", borderRadius: "5px", border: "none", width: "100%" }} type="submit">Add member</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateGroup;
