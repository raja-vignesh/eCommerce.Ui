// @vitest-environment jsdom
import { afterEach, expect, vi, describe, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loginRequest } from "../services/requests/LoginRequest";
import { Login } from "./Login";

// mock the login request
vi.mock("../services/requests/LoginRequest", () => ({
  loginRequest: vi.fn(),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Login", () => {
  it("shows an invalid email without calling api", async () => {
    // Arrange
    const user = userEvent.setup();
    const setIsLoggdIn = vi.fn();
    render(<Login setLoggedIn={setIsLoggdIn} />);
    // Act
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "bad-email",
    );
    await user.type(screen.getByLabelText(/password/i), "123456");
    await user.click(screen.getByRole("button", { name: /login/i }));
    // Assert
    expect(screen.getByText("please enter a valid email")).toBeTruthy();
    expect(loginRequest).not.toHaveBeenCalled();
    expect(setIsLoggdIn).not.toHaveBeenCalled();
  });
});
