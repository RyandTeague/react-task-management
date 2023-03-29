import React, { useEffect, useState } from 'react';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { CurrentUserContext, useCurrentUser } from '../../contexts/CurrentUserContext';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateGroup = ({ group }) => {
    const currentUser = useCurrentUser();
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState('');
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState([]);
    // console.log(profile);
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosReq.post('/groups/', {
                name: groupName,
                members: [...members, currentUser.id], // add the creator ID to the members array
            });
            setMessage(`Group "${response.data.name}" created successfully!`);
        } catch (error) {
            setMessage('There was a problem creating the group.');
        }
    };


    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosRes.patch(`/groups/${group.id}/`, {
                members: [...members, newMember],
            });
            setMembers(response.data.members);
            setNewMember('');
            setMessage(`Member "${newMember}" added successfully!`);
        } catch (error) {
            setMessage('There was a problem adding the member.');
        }
    };
    const fetchData = async () => {
        try {
            const pageProfile =
                await Promise.all([
                    axiosReq.get(`/profiles/`),
                ]);
            setProfile(pageProfile[0].data.results)
        } catch (err) {
            // console.log(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h2>Create Group</h2>
            <Form style={{ backgroundColor: "#1c1c1c", padding: "10px", borderRadius: "2px", border: "1px solid #383838" }} onSubmit={handleCreateGroup}>
                <Form.Group controlId='groupName'>
                    <Form.Label style={{ color: "#c9c9c9" }}>Group name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Group Name' onChange={(e) => setGroupName(e.target.value)} style={{ backgroundColor: "#1c1c1c", color: "#c9c9c9", borderRadius: "5px", border: "2px solid #383838", fontSize: "1.2rem", padding: "0.5rem", marginBottom: "1rem", width: "100%" }} />
                </Form.Group>
                <Button type='submit' style={{ backgroundColor: "#31b0d5", borderRadius: "5px", border: "none", width: "100%" }}>Create group</Button>
            </Form>
            {message && <p>{message}</p>}
            <hr />
            <h3>Add member</h3>
            <Form style={{ backgroundColor: "#1c1c1c", padding: "10px", borderRadius: "2px", border: "1px solid #383838" }} onSubmit={handleAddMember}>
                <Form.Group controlId='newMember'>
                    <Form.Label style={{ color: "#c9c9c9" }}>Search for a user</Form.Label>
                    <Form.Control type='text' placeholder='Enter Username' onChange={(e) => setNewMember(e.target.value)} style={{ backgroundColor: "#1c1c1c", color: "#c9c9c9", borderRadius: "5px", border: "2px solid #383838", fontSize: "1.2rem", padding: "0.5rem", marginBottom: "1rem", width: "100%" }} />
                </Form.Group>
                <Button type='submit' style={{ backgroundColor: "#31b0d5", borderRadius: "5px", border: "none", width: "100%" }}>Add member</Button>
            </Form>
            {message && <p>{message}</p>}
        </div>
    );


}

export default CreateGroup
