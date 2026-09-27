import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "../apiClient/apiClient";
import { loginRequest } from "./LoginRequest";

vi.mock("../apiClient/apiClient", () => ({
  apiClient: {
    multiPartPost: vi.fn(),
  },
}));

afterEach(() => {
  vi.resetAllMocks();
});

describe("loginRequest", () => {
  it("sends the credentials as form data", async () => {
    // Arrange
    vi.mocked(apiClient.multiPartPost).mockResolvedValue({
      userId: "b7c42d44-3a31-4cf0-9c59-52d1245f1b30",
      email: "raja@example.com",
      personName: "Raja",
      token: "test-token",
      success: true,
    });

    // Act
    const result = await loginRequest({
      request: {
        email: "raja@example.com",
        password: "password123",
      },
    });

    // Assert
    expect(result.success).toBe(true);
    expect(apiClient.multiPartPost).toHaveBeenCalledOnce();

    const [url, body] = vi.mocked(apiClient.multiPartPost).mock.calls[0];

    expect(url).toMatch(/\/api\/user\/login$/);
    expect(body).toBeInstanceOf(FormData);
    expect(body.get("email")).toBe("raja@example.com");
    expect(body.get("password")).toBe("password123");
  });
});
