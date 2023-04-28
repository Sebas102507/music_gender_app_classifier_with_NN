import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("<Button> component", () => {
  it("renders a button with the text 'Click me'", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button").textContent).toBe("Click me");
  });

  it("calls the onClick handler when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
