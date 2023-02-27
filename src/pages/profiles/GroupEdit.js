import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';

const EditGroup = ({ group, handleEdit, handleDelete }) => {
  const [groupName, setGroupName] = useState(group.name);
  const [members, setMembers] = useState(group.members.map(member => member.id));
  const [message, setMessage] = useState('');

  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosReq.put(`/api/groups/${group.id}/`, {
        name: groupName,
        members,
      });
      handleEdit(response.data);
      setMessage(`Group "${response.data.name}" updated successfully!`);
    } catch (error) {
      setMessage('There was a problem updating the group.');
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await axiosReq.patch(`/api/groups/${group.id}/`, {
        members: members.filter(member => member !== memberId),
      });
      handleEdit(response.data);
      setMessage(`Member removed successfully!`);
    } catch (error) {
      setMessage('There was a problem removing the member.');
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await axiosReq.delete(`/api/groups/${group.id}/`);
      handleDelete(group.id);
      setMessage(`Group "${group.name}" deleted successfully!`);
    } catch (error) {
      setMessage('There was a problem deleting the group.');
    }
  };

  return (
    <div>
      <h3>Edit group</h3>
      <form onSubmit={handleUpdateGroup}>
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
            {group.members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.username}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Update group</button>
        <button type="button" onClick={handleDeleteGroup}>Delete group</button>
      </form>
      {message && <p>{message}</p>}
      <hr />
      <h3>Remove member</h3>
      <ul>
        {group.members.map((member) => (
          <li key={member.id}>
            {member.username}
            <button type="button" onClick={() => handleRemoveMember(member.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditGroup;
