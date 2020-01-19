import React from 'react';
import { Form as SemanticForm } from 'semantic-ui-react';
import classes from './Form.module.scss';

const Form = ({ children }) => {
  return (
    <div className={classes.formContainer}>
      <SemanticForm>{children}</SemanticForm>
    </div>
  );
};

export default Form;
