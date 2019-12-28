import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../context/AuthContext';
import { useMutation } from '../../hooks';

const PostVacancy = () => {
  const [formData, setFormData] = useState({});
  const {
    user: { userId },
  } = useAuthContext();
  const { mutate } = useMutation();

  const handleChange = e => {
    const { name, value } = e.target || {};
    setFormData(state => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => mutate({ type: 'add', collection: 'vacancies', param: { ...formData, userId } });

  return (
    <div>
      <label>position</label>
      <input onChange={handleChange} name="position" />
      <label>ensemble</label>
      <input onChange={handleChange} name="ensemble" />
      <label>apply by</label>
      <input onChange={handleChange} name="apply by" />
      <label>type</label>
      <input onChange={handleChange} name="type" />
      <button onClick={handleSubmit} type="button">
        submit
      </button>
    </div>
  );
};

export default PostVacancy;
