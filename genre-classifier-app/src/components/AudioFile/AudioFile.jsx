import { useAudio } from "../../hooks";
import Button from "../Button/Button";

import "./AudioFile.css";

const AudioFile = ({ file, removeFile = undefined }) => {
  const [isPlaying, toggleAudio] = useAudio(URL.createObjectURL(file));

  const handleRemoveFile = async () => {
    if (isPlaying) {
      await toggleAudio();
    }
    URL.revokeObjectURL(file);
    removeFile(file);
  };

  return (
    <div className="audio-file">
      <div>
        {file.name} - {file.size} bytes
      </div>
      <div>
        <Button
          variant={isPlaying ? "info" : "success"}
          size="sm"
          onClick={toggleAudio}
        >
          {isPlaying ? "pause" : "play"}
        </Button>

        {removeFile && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleRemoveFile}
            style={{ marginLeft: "0.5rem" }}
          >
            remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default AudioFile;
