import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

const Home = () => {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    const getInstruments = async () => {
      const { docs } = await db.collection('instruments').get();
      setInstruments(docs);
    };
    getInstruments();
  }, []);

  return (
    <div>
      {instruments.map(({ id }) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
};

export default Home;
