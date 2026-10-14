import { it, describe, expect } from "vitest";
import { LoginRequestSchema } from "./LoginRequestSchema";

describe("LoginRequestSchema Tests", () => {
  it("accepts valid credentials", () => {
    // Arrange
    const input = {
      email: "daddy@dad.com",
      password: "123456",
    };
    //Act
    const result = LoginRequestSchema.safeParse(input);
    //Assert
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    //Arrange
    const input = {
      email: "daddy.com",
      password: "123456",
    };
    //Act
    const result = LoginRequestSchema.safeParse(input);
    //Assert
    expect(result.success).toBe(false);
  });
  it("rejects an empty password with message", () => {
    // Arrange
    const input = {
      email: "daddy.com",
      password: "",
    };
    // Act
    const response = LoginRequestSchema.safeParse(input);
    // Assert
    expect(response.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["password"],
          message: "Password is required",
        }),
      ]),
    );
  });
});
