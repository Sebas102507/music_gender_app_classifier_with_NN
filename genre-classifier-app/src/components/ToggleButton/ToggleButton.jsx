import Button from "../Button/Button";

const ToggleButton = ({ value, toggled, onClick, children, ...props }) => {
  return (
    <Button onClick={() => onClick(value)} toggled={toggled} outline {...props}>
      {children}
    </Button>
  );
};

export default ToggleButton;
