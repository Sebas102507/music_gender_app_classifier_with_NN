/* eslint-disable react/button-has-type */
import "./Button.css";

const Button = ({
  onClick,
  children,
  type = "button",
  variant = "primary",
  outline = false,
  toggled = false,
  size = "md",
  className = "",
  ...props
}) => {
  const variantClass = `btn-${outline ? "outline-".concat(variant) : variant}`;
  const classes = `btn ${variantClass} btn-${size} ${
    toggled ? "toggled" : ""
  } ${className}`.trim();

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
