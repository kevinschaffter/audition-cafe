import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

const useQuery = ({ where, collection }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const dbRef = where ? db.collection(collection).where(...where) : db.collection(collection);
        await dbRef.onSnapshot(({ docs }) => {
          setData(docs.map(item => ({ id: item.id, ...item.data() })));
        });
      } catch (e) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [collection, error]);

  return { data, error, loading };
};

export default useQuery;
