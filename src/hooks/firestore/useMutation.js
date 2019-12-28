import { useState } from 'react';
import { db } from '../../firebase/config';

const useMutation = () => {
  const [error, setError] = useState('');

  const mutate = ({ id, collection, type, param }) => {
    setError('');
    const dbRef = db.collection(collection);
    try {
      const action = {
        add: () => dbRef.add(param),
        delete: () => dbRef.doc(id).delete(),
      }[type];
      action();
    } catch (e) {
      setError(e);
    }
  };

  return { mutate, error };
};

export default useMutation;
