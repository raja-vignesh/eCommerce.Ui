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
    expect(result.success).toBeTruthy();
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
});
