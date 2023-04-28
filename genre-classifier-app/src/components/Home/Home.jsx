import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Home.css";

import firebaseService from "../../services/firebase/firebase";
import { addResult } from "../../reducers/resultsReducer";

import Button from "../Button/Button";
import Dropzone from "../Dropzone/Dropzone";
import AudioFile from "../AudioFile/AudioFile";
import ProgressBar from "../ProgressBar/ProgressBar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [task, setTask] = useState(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);

      setUploadProgress(0);
      setTask(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handlePredict = async (uploadInfo) => {
    const data = {
      fileName: file.name,
      ...uploadInfo,
    };

    const result = await dispatch(addResult(data));
    navigate(`/results/${result.id}`);
  };

  const handleUpload = async () => {
    setTask("Uploading file to storage service...");

    if (file) {
      firebaseService.uploadFile(
        file,
        (progress) => {
          setUploadProgress(progress);
        },
        (uploadInfo) => {
          setTask("File uploaded successfully!");

          handlePredict(uploadInfo);
        },
        (error) => {
          console.log(error);
          setTask("Something went wrong...");
        }
      );
    }
  };

  return (
    <div className="home">
      <h1>Music Genre Classifier</h1>
      <p>Go ahead and upload a song to determine its genre!</p>
      <Dropzone onDrop={handleDrop} />

      {file && (
        <>
          <p>
            <strong>Selected File</strong>
          </p>
          <AudioFile file={file} removeFile={handleRemoveFile} />

          <div className="upload-bar">
            {task ? (
              <Button variant="primary" onClick={handleUpload} disabled>
                Upload
              </Button>
            ) : (
              <Button variant="primary" onClick={handleUpload}>
                Upload
              </Button>
            )}

            <ProgressBar progress={uploadProgress} />
          </div>

          <p>{task}</p>
        </>
      )}
    </div>
  );
};

export default Home;
