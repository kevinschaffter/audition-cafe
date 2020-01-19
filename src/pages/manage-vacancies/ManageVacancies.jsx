import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useQuery, useMutation } from '../../hooks';
import { useHistory } from 'react-router';

const ManageVacancies = () => {
  const { user: { userId } = {} } = useAuthContext();
  const history = useHistory();
  const { data, loading } = useQuery({
    collection: 'vacancies',
    where: ['userId', '==', userId],
  });
  const { mutate } = useMutation();
  console.log(data, 'here is data');

  const handleDelete = id => () => mutate({ id, type: 'delete', collection: 'vacancies' });

  console.log(data, userId);

  return loading
    ? null
    : data.map(({ employer, id, name }) => (
        <div tabIndex={1} onClick={_ => history.push(`/edit-vacancy/${id}`)} role="button">
          {employer}
        </div>
      ));
};

export default ManageVacancies;
