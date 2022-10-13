import React from 'react';
import { useQuery } from '@apollo/client';

import Chat from '../components/Chat';

import { QUERY_MESSAGES } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_MESSAGES);
  const messages = data?.messages || [];



  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px solid black' }}
        >
          <Chat />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Chatter</div>
          ) : (
            <Chat
              messages={messages}
              title=""
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;









