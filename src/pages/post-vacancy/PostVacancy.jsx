import React, { useState, useEffect } from 'react';
import { FormInput, FormDropdown, Button } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useParams } from 'react-router';
import { useAuthContext } from '../../context/AuthContext';
import { useMutation, useLazyQuery } from '../../hooks';
import { Form, PlacesInput, FileUploader, DatePicker } from '../../components';
import { CATEGORY_OPTIONS, AUDITION_TYPES, TYPES_OF_WORK } from './constants';

const PostVacancy = () => {
  const [formData, setFormData] = useState({});
  const {
    user: { userId },
  } = useAuthContext();
  const { id: vacancyId } = useParams();
  const { mutate } = useMutation();
  const { lazyQuery } = useLazyQuery();

  useEffect(() => {
    if (!vacancyId) return;
    const fetchData = async () => {
      const data = await lazyQuery({ collection: 'vacancies', docId: vacancyId });
      setFormData(data);
    };
    fetchData();
  }, [lazyQuery, vacancyId]);

  const handleChange = e => {
    const { name, value } = e.target || e || {};
    setFormData(state => ({ ...state, [name]: value }));
  };

  const handleDropdownChange = (_, { value, name }) => {
    setFormData(state => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    let type = 'add';
    if (vacancyId) type = 'update';
    mutate({ type, collection: 'vacancies', ...(vacancyId && { docId: vacancyId }), param: { ...formData, userId } });
  };

  return (
    <div>
      <Form>
        <FormInput label="Ensemble / Employer" name="employer" value={formData.employer} onChange={handleChange} />
        <FileUploader label="Logo" name="logoImg" onChange={handleChange} path="vacancies/assets" />
        <FormInput
          label="Employer Webpage"
          name="employerWebpage"
          value={formData.employerWebpage}
          onChange={handleChange}
        />
        <FormInput label="Contact Email Address" name="contactEmail" onChange={handleChange} />
        <FormDropdown
          label="Instrument / Job"
          name="jobCategory"
          placeholder="Select"
          selection
          search
          options={CATEGORY_OPTIONS}
          onChange={handleDropdownChange}
        />
        <FormInput
          label="Title of Position"
          name="positionTitle"
          placeholder="Concertmaster, Second Clarinet etc..."
          onChange={handleChange}
        />
        <FormDropdown
          label="Type of Audition (optional)"
          name="typeOfAudition"
          placeholder="Live, Recorded or Both"
          selection
          options={AUDITION_TYPES}
          onChange={handleDropdownChange}
        />
        <FormDropdown
          label="Type of Work"
          name="typeOfWork"
          placeholder="Full-time, Part-time, Substitute, Temporary, Competition"
          selection
          options={TYPES_OF_WORK}
          onChange={handleDropdownChange}
        />
        <PlacesInput
          label="Location"
          name="location"
          placeholder="Business name or address"
          id="google"
          onChange={handleChange}
        />
        <DatePicker label="Application Date" name="applicationDate" onChange={handleChange} />
        <DatePicker label="Audition Date" name="auditionDate" onChange={handleChange} />
        <FormInput
          label="Weeks in Season"
          name="weeksInSeason"
          placeholder="number"
          type="Enter number"
          onChange={handleChange}
        />
        <FormInput
          label="Audition Webpage (for further information)"
          name="auditionWebpage"
          onChange={handleChange}
          placeholder="mysite.com"
        />
        <FormInput
          label="Audition Information and/or Repertoire Requirements"
          name="auditionInformation"
          onChange={handleChange}
          control={TextareaAutosize}
          minRows={3}
          maxRows={6}
        />
        <FileUploader
          label="Upload Audition Information PDF (Optional)"
          name="jobPDF"
          path="vacancies/assets"
          onChange={handleChange}
        />
        <FileUploader
          label="Repertoire List (Optional)"
          name="repertoirePDF"
          path="vacancies/assets"
          onChange={handleChange}
        />
        <FileUploader
          label="Job City Thumbnail"
          name="jobCityThumbImg"
          path="vacancies/assets"
          onChange={handleChange}
        />
      </Form>
      <Button content="submit" primary onClick={handleSubmit} />
    </div>
  );
};

export default PostVacancy;
