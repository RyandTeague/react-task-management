import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosReq.get('/api/groups/');
        setGroups(response.data.filter(group => group.members.some(member => member.id === currentUser.id)));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroups();
  }, [currentUser]);

  return (
    <div>
      <h2>Groups</h2>
      {groups.map((group) => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <ul>
            {group.members.map((member) => (
              <li key={member.id}>{member.username}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
