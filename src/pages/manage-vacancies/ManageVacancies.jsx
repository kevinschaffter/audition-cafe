import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useQuery, useMutation } from '../../hooks';

const ManageVacancies = () => {
  const { user: { userId } = {} } = useAuthContext();
  const { data, loading } = useQuery({
    collection: 'vacancies',
    where: ['userId', '==', userId],
  });
  const { mutate } = useMutation();

  const handleDelete = id => () => mutate({ id, type: 'delete', collection: 'vacancies' });

  return loading
    ? null
    : data.map(({ ensemble, id }) => (
        <div tabIndex={1} onClick={handleDelete(id)} role="button">
          {ensemble}
        </div>
      ));
};

export default ManageVacancies;
