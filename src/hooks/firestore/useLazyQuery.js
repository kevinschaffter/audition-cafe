import { useState } from 'react';
import { db } from '../../firebase/config';

const useLazyQuery = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const lazyQuery = async ({ collection, docId }) => {
    try {
      setLoading(true);
      const doc = await db
        .collection(collection)
        .doc(docId)
        .get();
      if (doc.exists) return doc.data();
    } catch (e) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { lazyQuery, error, loading };
};

export default useLazyQuery;
