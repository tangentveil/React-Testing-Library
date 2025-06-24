import { render, screen, logRoles } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent, { UserEvent } from "@testing-library/user-event";

const getFormElements = () => {
  const elements = {
    emailInputElement: screen.getByRole("textbox", { name: /email/i }),
    passwordInputElement: screen.getByLabelText("Password"),
    confirmPasswordInputElement: screen.getByLabelText(/confirm password/i),
    submitButton: screen.getByRole("button", { name: /submit/i }),
  };

  return elements;
};

describe("05-form-testing", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  test("inputs should be initially empty", () => {
    // const { container } = render(<Sandbox />);
    // screen.debug();
    // logRoles(container);

    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    expect(emailInputElement).toHaveValue("");

    expect(passwordInputElement).toHaveValue("");

    expect(confirmPasswordInputElement).toHaveValue("");
  });

  test("should be able to type in the input", async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    await user.type(emailInputElement, "test@test.com");
    expect(emailInputElement).toHaveValue("test@test.com");

    await user.type(passwordInputElement, "123456");
    expect(passwordInputElement).toHaveValue("123456");

    await user.type(confirmPasswordInputElement, "123456");
    expect(confirmPasswordInputElement).toHaveValue("123456");
  });

  test("should show email error if email is invalid", async () => {
    const { emailInputElement, submitButton } = getFormElements();
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    await user.type(emailInputElement, "invalid");
    await user.click(submitButton);

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  test("should show password error if password is less than 5 characters", async () => {
    const { emailInputElement, submitButton, passwordInputElement } =
      getFormElements();
    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "1234");
    await user.click(submitButton);

    expect(
      screen.getByText(/password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  test("should show password error if password do not match", async () => {
    const {
      emailInputElement,
      submitButton,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();
    const errorMsg = /Password do not match/i;
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "123456");
    await user.type(confirmPasswordInputElement, "1234567");
    await user.click(submitButton);

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });

  test("valid inputs show no errors and clear fields", async () => {
    const {
      emailInputElement,
      submitButton,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();
    const errorMsg = /Password do not match/i;
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument();

    await user.type(emailInputElement, "test@test.com");
    await user.type(passwordInputElement, "123456");
    await user.type(confirmPasswordInputElement, "123456");
    await user.click(submitButton);

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password must be at least 5 characters/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password do not match/i)).not.toBeInTheDocument();

    expect(emailInputElement).toHaveValue("")
    expect(passwordInputElement).toHaveValue("")
    expect(confirmPasswordInputElement).toHaveValue("")
  });
});
