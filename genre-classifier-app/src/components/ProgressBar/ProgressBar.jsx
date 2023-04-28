import "./ProgressBar.css";

const ProgressBar = ({ progress, size = "md" }) => {
  const classes = `progress-bar progress-bar-${size}`.trim();

  return (
    <div className={classes}>
      <div className="progress-bar--fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
