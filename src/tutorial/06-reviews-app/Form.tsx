import { FormEvent, useState } from "react";
import { Review } from "./Sandbox";

type ReviewFormProps = {
  onSubmit: (review: Review) => void;
};

function Form({ onSubmit }: ReviewFormProps) {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length >= 10) {
      const newReview = { email, rating, text };
      onSubmit(newReview);
      setEmail("");
      setRating("");
      setText("");
      setTextError("");
    } else {
      setTextError("Review must be at least 10 characters long");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="rating" className="block mb-2">
          Rating
        </label>
        <select
          name="rating"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select rating</option>
          {[5, 4, 3, 2, 1].map((num) => {
            return (
              <option value={num}>
                {num} star{num !== 1 ? "s" : "."}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label htmlFor="text" className="block mb-2">
          Your Review
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded"
          required
          rows={4}
        />
        {textError && <p className="text-red-500 text-sm mt-1">{textError}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
}

export default Form;
