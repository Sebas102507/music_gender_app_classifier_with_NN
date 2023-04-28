import { useDropzone } from "react-dropzone";

import "./Dropzone.css";

const Dropzone = ({
  onDrop,
  maxFiles = 1,
  accept = { "audio/wav": [".wav"] },
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    maxFiles,
    accept,
  });

  const getDropzoneClass = () => {
    if (isDragAccept) {
      return "dropzone dropzone--accept";
    }
    if (isDragReject) {
      return "dropzone dropzone--reject";
    }
    if (isDragActive) {
      return "dropzone dropzone--active";
    }
    return "dropzone";
  };

  const getDropzoneText = () => {
    const plural = maxFiles > 1 ? "s" : "";
    const some = maxFiles > 1 ? "some" : "a";

    if (isDragAccept) {
      return `Drop the file${plural} here...`;
    }
    if (isDragReject) {
      return "Unsupported file type...";
    }
    return `Drag & drop ${some} file${plural} here, or click to select ${some} file${plural}`;
  };

  const getSupportedFileTypes = () => {
    const fileTypes = Object.keys(accept);
    const fileTypesString = fileTypes.join(", ");
    return fileTypesString;
  };

  return (
    <div {...getRootProps({ className: getDropzoneClass() })}>
      <input className="dropzone-input" {...getInputProps()} />
      <p className="dropzone-text">{getDropzoneText()}</p>
      <p className="dropzone-text">
        <strong>Supported file types:</strong> {getSupportedFileTypes()}
      </p>
    </div>
  );
};

export default Dropzone;
