import { render, screen } from "@testing-library/react";
import AddTask from "./AddTask";

test("it rendered add task page", () => {
  // Arrange
  render(<AddTask />);
  // Act
  const addTaskButton = screen.getByText(/add task/i);
  // Assert
  expect(addTaskButton).toBeInTheDocument();
});
