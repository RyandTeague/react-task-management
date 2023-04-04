import React, { useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import {
  CurrentUserContext,
  useCurrentUser,
} from "../../contexts/CurrentUserContext";
import Select from "react-select";
import axios from "axios";
import Cookies from "js-cookie";

const CreateGroup = ({ groupCreated, setGroupCreated }) => {
  const currentUser = useCurrentUser();
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [groupMessage, setGroupMessage] = useState("");
  const [memberMessage, setMemberMessage] = useState("");
  const [profile, setProfile] = useState([]);
  const [groups, setGroups] = useState([]);
  const [ownedGroupsOptions, setOwnedGroupsOptions] = useState([])
  const [ownedMembersOptions, setOwnedMembersOptions] = useState([])
  const [group, setGroup] = useState(0)
  const [ownedMembers, setOwnedMembers] = useState([])

  console.log(groups)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // I commented the jsx because this get api is not working
        const response = await axiosReq.get('/groups/');
        console.log('groups data: ', response.data)
        setGroups(response?.data?.data);
        const ownedGrops = response?.data?.data.filter(group=> group.is_owner === true)
        let groupOptions = ownedGrops.map(function (group) {
          return { value: group.id, label: group.name, members: group.members };
        })
        setOwnedGroupsOptions(groupOptions)
        // setGroups(response.data.filter(group => group.members.some(member => member.id === currentUser.id)));
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroups();
  }, [groupCreated]);


  const fetchProfiles = async () => {
    try {
      const pageProfile = await Promise.all([axiosReq.get(`/profiles/`)]);
      setProfile(pageProfile[0].data.results);
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/users/`);
      console.log('users response: ', response)
      setUsers(response?.data?.data);
    } catch (err) {
      console.log('users fetch err: ', err);
    }
  };

  useEffect(() => {
    fetchProfiles();
    fetchUsers();
  }, []);


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
      const response = await axiosReq.post("/groups/", {
      // const response = await axiosReq.post("https://task-backend.herokuapp.com/groups/", {
        name: groupName,
        members: members, // add the creator ID to the members array
      },
      config
      );
      setGroupCreated(!groupCreated);
      setGroupMessage(`Group "${response.data.name}" created successfully!`);
    } catch (error) {
      console.log('error: ', error);
      setGroupMessage("There was a problem creating the group.");
    }
  };

  const handleAddRemoveMember = async (e) => {
    e.preventDefault();
    if (group && ownedGroupsOptions.length){
      try {
        const response = await axios.patch(
          `/groups/${group}/`,
          // `https://task-backend.herokuapp.com/groups/${group.id}/`,
          {
            group: group,
            members: [...ownedMembersOptions.map(member=> member.value)],
          }
        );
        setGroup(0);
        setOwnedMembersOptions([])
        setGroupCreated(!groupCreated);
        setMemberMessage(`Members updated successfully!`);
      } catch (error) {
        setMemberMessage("There was a problem updating the members.");
      }

    }else{
      alert("Group and members are required.")
    }
  };

  const handleChange1 = (e) => {
    setMembers(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleGroupChange = (selectedOption) => {
    setGroup(selectedOption.value);
    const selectedGroup = groups.find((group) => group.id === selectedOption.value);
    if (selectedGroup) {
      const memberOptions = selectedGroup.members.map(function (member) {
        return { value: member.id, label: member.username };
      });
      setOwnedMembersOptions(memberOptions);
    } else {
      setOwnedMembersOptions([]);
    }
  };

  const handleMembersChange = (e) => {
    console.log('handleMembersChange e: ', e);
    Array.isArray(e) ? setOwnedMembersOptions([...e]) : setOwnedMembersOptions([])
  };

  let options = profile.map(function (user) {
    return { value: user.id, label: user.owner };
  });

  let usersOptions = users.map(function(user){
    return {value: user.id, label: user.username}
  })

  console.log('ownedGroupsOptions: ', ownedGroupsOptions);
  console.log('group: ', group);
  console.log('ownedMembersOptions: ', ownedMembersOptions);
  console.log('ownedMembers: ', ownedMembers);
  console.log('options: ', options);
  console.log('users: ', users);
  console.log('usersOptions: ', usersOptions);

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
      {groupMessage && <p>{groupMessage}</p>}
      <hr />
      <h3>Edit Groups</h3>
      <form style={{backgroundColor: "#1c1c1c", padding: "10px", borderRadius: "2px", border: "1px solid #383838" }} onSubmit={handleAddRemoveMember}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', }}>
          <label style={{ color: "#c9c9c9" }}>
              Choose group:
              <Select
              options={ownedGroupsOptions}
              onChange={handleGroupChange}
              classNamePrefix="select"
            />
            </label>
          <label style={{ color: "#c9c9c9" }}>
              Select members:
              <Select
              isMulti
              value={ownedMembersOptions}
              options={usersOptions}
              onChange={handleMembersChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </label>
        </div>
        <button style={{ backgroundColor: "#31b0d5", borderRadius: "5px", border: "none", width: "100%" }} type="submit">Edit Group</button>
      </form>
      {memberMessage && <p>{memberMessage}</p>}
    </div>
  );
};

export default CreateGroup;
