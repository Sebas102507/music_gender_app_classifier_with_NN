import { useState, useEffect } from "react";

import "./Result.css";

import firebaseService from "../../services/firebase/firebase";
import classifierService from "../../services/api/classifier";

import AudioFile from "../AudioFile/AudioFile";
import Alert from "../Alert/Alert";
import ProgressBar from "../ProgressBar/ProgressBar";

const Result = ({ result }) => {
  if (!result) return null;

  const { id } = result;
  const { fileName, storagePath } = result.file;

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(result.status);
  const [prediction, setPrediction] = useState(result.prediction);

  useEffect(() => {
    const fetchFile = async () => {
      if (result) {
        const blob = await firebaseService.downloadFile(storagePath);
        const file = new File([blob], fileName, { type: blob.type });
        setFile(file);
      }
    };
    fetchFile();
  }, [fileName, storagePath]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = await classifierService.getResult(id);
      if (result.status.code === "SUCCESS") {
        clearInterval(interval);

        setStatus(result.status);
        setPrediction(result.prediction);
      } else if (result.status.code === "ERROR") {
        clearInterval(interval);

        setStatus(result.status);
        setPrediction(null);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const { code, message } = status;

  const statusAlertType = () => {
    switch (code) {
      case "SUCCESS":
        return "success";
      case "ERROR":
        return "danger";
      case "PROCESSING":
        return "info";
      default:
        return "info";
    }
  };

  if (code === "PROCESSING" || code === "ERROR") {
    return (
      <div className="result">
        <h2>Genre Classification Result</h2>
        <Alert type={statusAlertType()} message={message} badge={code} />
      </div>
    );
  }

  const { genre, probability } = prediction;

  return (
    <div className="result">
      <h2>Genre Classification Result</h2>

      <Alert
        message={message}
        type={statusAlertType(status)}
        badge={code}
        style={{ marginBottom: "1rem" }}
      />

      {file && <AudioFile file={file} />}

      {prediction && (
        <div className="prediction">
          <h3>Prediction</h3>

          <table className="table">
            <tbody>
              <tr className="table-row">
                <td className="table-cell dark-cell">Genre</td>
                <td className="table-cell">{genre}</td>
              </tr>
              <tr>
                <td className="table-cell dark-cell">Probability</td>
                <td className="table-cell">{probability}</td>
              </tr>
            </tbody>
          </table>

          <ProgressBar progress={probability * 100} size="sm" />
        </div>
      )}
    </div>
  );
};

export default Result;
