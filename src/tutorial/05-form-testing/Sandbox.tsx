import React, { useState } from "react";
import validator from "validator";

const labelStyles = "block text-grey-700 font-medium mb-2";
const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md";
const buttonStyles =
  "w-full bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600";

const defaultState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Sandbox = () => {
  const [signUpInput, setSignUpInput] = useState(defaultState);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpInput({ ...signUpInput, [id]: value });
  };
  const handleSubmit = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validator.isEmail(signUpInput.email)) {
      return setError("Invalid Email");
    }

    if (!validator.isLength(signUpInput.password, { min: 5 })) {
      return setError("Password must be at least 5 characters");
    }

    if (signUpInput.password !== signUpInput.confirmPassword) {
      return setError("Password do not match");
    }

    setError("");
    setSignUpInput(defaultState);
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
      <form className="space-y-4">
        {/* email input */}
        <div className="mb-3">
          <label htmlFor="email" className={labelStyles}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={signUpInput.email}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>

        {/* password input */}
        <div className="mb-3">
          <label htmlFor="password" className={labelStyles}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={signUpInput.password}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>

        {/* confirm password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className={labelStyles}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={signUpInput.confirmPassword}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="button" onClick={handleSubmit} className={buttonStyles}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Sandbox;
