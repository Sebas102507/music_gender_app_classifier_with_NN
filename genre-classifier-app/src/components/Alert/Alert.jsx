import "./Alert.css";

const Alert = ({
  message,
  type,
  badge = undefined,
  className = "",
  ...props
}) => {
  const classes = `alert alert-${type} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {badge && (
        <span className="badge">
          <div className="badge-circle" />
          <span className="badge-text">{badge}</span>
        </span>
      )}
      <div>{message}</div>
    </div>
  );
};

export default Alert;
