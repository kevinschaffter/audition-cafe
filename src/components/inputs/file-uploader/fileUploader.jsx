import React from 'react';
import { Button, Progress, Icon } from 'semantic-ui-react';
import { useUpload } from '../../../hooks';
import classes from './FileUploader.module.scss';

const FileUploader = ({ label, path, onChange, name }) => {
  const onSuccess = uploadData => onChange && onChange({ name, value: uploadData });
  const { progress, upload, fileURL, fileName, deleteUpload } = useUpload({ onSuccess });
  const handleUpload = e => {
    const [file] = e.target?.files || [];
    if (file) upload({ path, file, name: file.name });
  };

  return (
    <div className={classes.container}>
      <label htmlFor="uploadButton">{label}</label>
      <div className={classes.uploadContainer}>
        <Button htmlFor="file" as="label" id="uploadButton" className={classes.uploadBtn}>
          Upload
        </Button>
        <input
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={handleUpload}
          accept="image/*, application/pdf"
        />
        {fileURL && (
          <>
            <a href={fileURL}>{fileName}</a>
            <Icon name="close" onClick={deleteUpload} className={classes.close} />
          </>
        )}
      </div>
      {!!progress && progress < 100 && (
        <Progress percent={progress} color="green" size="tiny" className={classes.progress} />
      )}
    </div>
  );
};

export default FileUploader;
