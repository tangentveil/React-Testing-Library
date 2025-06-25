import { screen, render } from "@testing-library/react";
import List from "../List";
import { Review } from "../Sandbox";

const mockReviews: Review[] = [
  { email: "text@example.com", rating: "4", text: "Great Prodyuct!" },
  { email: "user@example.com", rating: "5", text: "Excellent Service" },
];

// we can't use beforeEach, because our component is changing based on reviews

describe("List Component", () => {
  test("render heading", () => {
    render(<List reviews={[]} />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /review/i,
      })
    ).toBeInTheDocument();
  });

  test('displays "No reviews yet" when reviews array is empty', () => {
    render(<List reviews={[]} />);
    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
  });

  test("renders reviews correctly when provided", () => {
    render(<List reviews={mockReviews} />);

    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      const stars = "⭐".repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
