import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CurrentUserContext, useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';

const GroupList = ({groupCreated}) => {
  const [groups, setGroups] = useState([]);
  // const { currentUser } = useContext(CurrentUserContext);
 const currentUser = useCurrentUser();
 console.log(groups)
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // I commented the jsx because this get api is not working
        const response = await axiosReq.get('/groups/');
        console.log('groups data: ', response.data)
        setGroups(response?.data?.data);
        // setGroups(response.data.filter(group => group.members.some(member => member.id === currentUser.id)));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroups();
  }, [groupCreated]);

  return (
    <div>
      <h2>Groups</h2>
      {groups.map((group) => (
        <div key={group.id}>
          <h3>{group.name}</h3>
          <ul>
            {group.members.map((member) => (
              <li key={member.username}>{member.username}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
