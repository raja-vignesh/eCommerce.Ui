import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "./apiClient";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("apiClient", () => {
  it("throws an ApiError for an HTTP 404 response", async () => {
    // Arrange
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({
        title: "Not Found",
        detail: "Email not found",
        errors: {},
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    // Act and Assert
    await expect(apiClient.get("/api/user/login")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
      title: "Not Found",
      detail: "Email not found",
    });
  });
});
