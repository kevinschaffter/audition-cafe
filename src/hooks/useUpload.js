import { storageRef } from '../firebase/config';
import { useState, useRef } from 'react';

const useUpload = ({ onSuccess }) => {
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileURL] = useState('');
  const fileNameRef = useRef(null);
  const pathRef = useRef(null);

  const upload = ({ name, file, path }) => {
    // reference used for deletion
    pathRef.current = `${path}/${name}`;
    // file name saved as return value
    fileNameRef.current = name;
    const uploadTask = storageRef.child(`${path}/${name}`).put(file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      error => {
        // Handle unsuccessful uploads
      },
      async () => {
        // Handle successful uploads on complete
        onSuccess && onSuccess(pathRef.current);
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        setFileURL(downloadURL);
      }
    );
  };

  const deleteUpload = async () => {
    if (!pathRef.current) return;
    try {
      await storageRef.child(pathRef.current).delete();
      setFileURL('');
    } catch (e) {
      console.log(e);
    }
  };

  return { upload, progress, fileURL, fileName: fileNameRef.current, deleteUpload };
};

export default useUpload;
