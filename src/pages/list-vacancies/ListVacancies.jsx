import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '../../hooks';

const ListVacancies = () => {
  const { instrument } = useParams();
  const { data, loading } = useQuery({ collection: 'vacancies', where: ['type', '==', instrument] });

  return <div>{loading ? 'loading' : data.map(({ position }) => <div>{position}</div>)}</div>;
};

export default ListVacancies;
