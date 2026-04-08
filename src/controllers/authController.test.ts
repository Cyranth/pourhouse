import type { Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { AuthController } from "@/controllers/authController";
import type { AuthService } from "@/services/authService";

function createResponse() {
  const res = {
    status: vi.fn(),
    json: vi.fn()
  } as unknown as Response;

  vi.mocked(res.status).mockReturnValue(res);
  vi.mocked(res.json).mockReturnValue(res);

  return res;
}

describe("AuthController", () => {
  it("authenticateWithGoogle returns 200 with payload", async () => {
    const authService = {
      authenticateWithGoogle: vi.fn()
    } as unknown as AuthService;

    vi.mocked(authService.authenticateWithGoogle).mockResolvedValue({
      token: "t",
      user: {
        id: "u",
        email: "u@example.com",
        name: "User",
        createdAt: new Date("2026-01-01T00:00:00.000Z")
      }
    });

    const controller = new AuthController(authService);
    const req = { body: { authorizationCode: "auth-code" } } as Request;
    const res = createResponse();

    await controller.authenticateWithGoogle(req, res);

    expect(authService.authenticateWithGoogle).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "t",
      user: {
        id: "u",
        email: "u@example.com",
        name: "User",
        createdAt: new Date("2026-01-01T00:00:00.000Z")
      }
    });
  });
});
