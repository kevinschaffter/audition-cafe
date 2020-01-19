import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';

const useQuery = ({ where, collection, skip }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (skip) return;
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
    // Purposely leaving where out as it is passed by reference. Need to look at another solution.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, error, skip]);

  return { data, error, loading };
};

export default useQuery;
