import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUser } from '../../api/ApliClient';
import Diss from '../disses/Diss';

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState({ username: '', disses: [], dissesLikes: [] });
  const [disses, setDisses] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    getUser(searchParams.get('userId')).then((response) => {
      let disses = response.data.disses.sort((a, b) => {
        new Date(b.timestamp) - new Date(a.timestamp);
      });
      setDisses(disses);
      setUser(response.data);
    });
  };

  const getLikes = (dissId) => {
    let count = 0;
    for (let likes of user.dissesLikes) {
      if (likes.dissId == dissId) {
        count++;
      }
    }
    return count;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-snow-storm-100">
      <div className="w-3/4 bg-white rounded shadow-lg mt-12">
        <h1 className="text-7xl font-bold text-center">{user.username}</h1>
        <br />
        <h2 className="text-5xl text-green-500 text-center">{user.disses.length} disses written</h2>
        <br />
        <h2 className="text-5xl text-red-500 text-center">{user.dissesLikes.length} likes given</h2>
        <br />
        <h3 className="text-5xl text-center">Disses</h3>
        <div className="w-full grid grid-cols-1 gap-4 p-4">
          {disses.map((diss) => (
            <Diss
              key={diss.id}
              id={diss.id}
              diss={diss.diss}
              name={user.username}
              likes={getLikes(diss.id)}
              onLike={() => getUserData()}
              datetime={diss.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Profile;
