// @vitest-environment jsdom
import { afterEach, expect, vi, describe, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loginRequest } from "../services/requests/LoginRequest";
import { Login } from "./Login";
import { ApiError } from "../sharedTypes/ApiError";
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

  it("submits valid credentials and marks the user as logged in", async () => {
    // Arrange
    const user = userEvent.setup();
    const setIsLoggedIn = vi.fn();

    vi.mocked(loginRequest).mockResolvedValue({
      userId: "b7c42d44-3a31-4cf0-9c59-52d1245f1b30",
      email: "raja@example.com",
      personName: "Raja",
      token: "test-token",
      success: true,
    });

    render(<Login setLoggedIn={setIsLoggedIn} />);

    // Act
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "raja@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Assert
    expect(loginRequest).toHaveBeenCalledWith({
      request: {
        email: "raja@example.com",
        password: "password123",
      },
      signal: expect.any(AbortSignal),
    });

    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });

  it("shows the API error and does not log the user in", async () => {
    // Arrange
    const user = userEvent.setup();
    const setIsLoggedIn = vi.fn();

    vi.mocked(loginRequest).mockRejectedValue(
      new ApiError(401, "Unauthorized", "Invalid email or password", {}),
    );

    render(<Login setLoggedIn={setIsLoggedIn} />);

    // Act
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "raja@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "wrong-password");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Assert
    expect(await screen.findByText("Invalid email or password")).toBeTruthy();
    expect(loginRequest).toHaveBeenCalledOnce();
    expect(setIsLoggedIn).not.toHaveBeenCalled();
  });

  it("shows email not found when the API returns 404", async () => {
    // Arrange
    const user = userEvent.setup();
    const setIsLoggedIn = vi.fn();

    vi.mocked(loginRequest).mockRejectedValue(
      new ApiError(404, "Not Found", "Email not found", {}),
    );

    render(<Login setLoggedIn={setIsLoggedIn} />);

    // Act
    await user.type(
      screen.getByRole("textbox", { name: /email/i }),
      "missing@example.com",
    );
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    // Assert
    expect(await screen.findByText("Email not found")).toBeTruthy();
    expect(loginRequest).toHaveBeenCalledWith({
      request: {
        email: "missing@example.com",
        password: "password123",
      },
      signal: expect.any(AbortSignal),
    });
    expect(setIsLoggedIn).not.toHaveBeenCalled();
  });
});
