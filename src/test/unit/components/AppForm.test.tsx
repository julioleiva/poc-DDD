import { render, screen, fireEvent } from "@testing-library/react";
import AppForm from "../../../components/AppForm/AppForm";

describe("AppForm", () => {
  test("displays error when title is empty", async () => {
    render(<AppForm onSave={jest.fn()} />);
    fireEvent.click(screen.getByText(/Create/i));
    expect(await screen.findByText("Title is required.")).toBeInTheDocument();
  });

  test("displays auto-generated route when title is entered", async () => {
    render(<AppForm onSave={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText("Application name"), { target: { value: 'Test' } });
    expect((screen.getByPlaceholderText("Route (optional)") as HTMLInputElement).value).toBe("test");
  });
});
