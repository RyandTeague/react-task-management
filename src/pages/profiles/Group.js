import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { CurrentUserContext, useCurrentUser } from '../../contexts/CurrentUserContext';

const CreateGroup = ({ group }) => {
    const currentUser = useCurrentUser();
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosReq.post('/api/groups/', {
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
            const response = await axios.patch(`/api/groups/${group.id}/`, {
                members: [...members, newMember],
            });
            setMembers(response.data.members);
            setNewMember('');
            setMessage(`Member "${newMember}" added successfully!`);
        } catch (error) {
            setMessage('There was a problem adding the member.');
        }
    };

    return (
        <div>
            <h2>{group.name}</h2>
            <ul>
                {group.members.map((member) => (
                    <li key={member.id}>{member.username}</li>
                ))}
            </ul>
            <form onSubmit={handleCreateGroup}>
                <label>
                    Group name:
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </label>
                <label>
                    Members:
                    <select
                        multiple
                        value={members}
                        onChange={(e) =>
                            setMembers(
                                Array.from(
                                    e.target.selectedOptions,
                                    (option) => option.value
                                )
                            )
                        }
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Create group</button>
            </form>
            {message && <p>{message}</p>}
            <hr />
            <h3>Add member</h3>
            <form onSubmit={handleAddMember}>
                <label>
                    Search for a user:
                    <input
                        type="text"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                    />
                </label>
                <button type="submit">Add member</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
export default CreateGroup
