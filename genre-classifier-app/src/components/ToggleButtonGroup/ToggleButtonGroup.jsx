import { useEffect, Children, cloneElement } from "react";

import "./ToggleButtonGroup.css";

const ToggleButtonGroup = ({
  value,
  onChange,
  children,
  exclusive = false,
  required = false,
  orientation = "horizontal",
  className = "",
  ...props
}) => {
  useEffect(() => {
    if (required && value.length === 0) {
      onChange([children[0].props.value]);
    }
  }, []);

  const handleClick = (childValue) => {
    if (exclusive) {
      if (required) {
        onChange([childValue]);
      } else {
        onChange(childValue === value[0] ? [] : [childValue]);
      }
    } else if (required) {
      if (value.includes(childValue)) {
        if (value.length > 1) {
          onChange(value.filter((v) => v !== childValue));
        } else {
          onChange(value);
        }
      } else {
        onChange([...value, childValue]);
      }
    } else {
      onChange(
        value.includes(childValue)
          ? value.filter((v) => v !== childValue)
          : [...value, childValue]
      );
    }
  };

  const classes =
    `toggle-button-group group-${orientation} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {Children.map(children, (child) => {
        const { value: childValue } = child.props;
        return cloneElement(child, {
          onClick: handleClick,
          toggled: value.includes(childValue),
        });
      })}
    </div>
  );
};

export default ToggleButtonGroup;
