import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("01-search-by-text", () => {
  test("demonstrate different query methods", async () => {
    render(<Sandbox />);

    // 1. getByText
    // const heading = screen.getByText('React Testing Library Examples')
    // expect(heading).toBeInTheDocument();

    expect(screen.getByText(/react/i)).toBeInTheDocument();

    const phoneRegex = /\d{3}-\d{3}-\d{2}/;
    const phoneText = screen.getByText(phoneRegex);
    expect(phoneText).toBeInTheDocument();

    // const errorMessage = screen.getByText('Error Message')  // error
    const errorMessage = screen.queryByText("Error Message");
    expect(errorMessage).not.toBeInTheDocument();

    // const items = screen.getByText('Item 1')  // can't search for multiple items
    const items = screen.getAllByText("Item 1");
    expect(items).toHaveLength(3);

    // const asyncMessage = screen.getByText('Async message')
    // const asyncMessage = await screen.findByText('Async message')
    // expect(asyncMessage).toBeInTheDocument()

    expect(await screen.findByText("Async message")).toBeInTheDocument();
  });
});
