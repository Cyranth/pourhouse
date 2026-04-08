import type { NextFunction, Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IUserRepository } from "@/repositories/user/IUserRepository";
import { AppError } from "@/utils/appError";
import * as jwtUtils from "@/utils/jwt";
import { createAdminAuthMiddleware } from "@/middleware/adminAuthMiddleware";

describe("adminAuthMiddleware", () => {
  const findById = vi.fn();
  const userRepository = { findById } as unknown as IUserRepository;
  const adminAuthMiddleware = createAdminAuthMiddleware(userRepository);

  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => { });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws unauthorized when authorization header is missing", async () => {
    const req = {
      method: "GET",
      originalUrl: "/api/admin/wines",
      ip: "127.0.0.1",
      headers: {}
    } as unknown as Request;

    const next = vi.fn() as NextFunction;

    await expect(adminAuthMiddleware(req, {} as Response, next)).rejects.toEqual(
      new AppError("Unauthorized", 401)
    );
    expect(next).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      "Admin access denied",
      expect.objectContaining({ reason: "missing_header" })
    );
  });

  it("throws unauthorized when token cannot be verified", async () => {
    const req = {
      method: "GET",
      originalUrl: "/api/admin/wines",
      ip: "127.0.0.1",
      headers: { authorization: "Bearer invalid" }
    } as unknown as Request;

    vi.spyOn(jwtUtils, "verifyToken").mockImplementation(() => {
      throw new Error("invalid token");
    });

    await expect(adminAuthMiddleware(req, {} as Response, vi.fn())).rejects.toEqual(
      new AppError("Unauthorized", 401)
    );

    expect(console.warn).toHaveBeenCalledWith(
      "Admin access denied",
      expect.objectContaining({ reason: "invalid_token" })
    );
  });

  it("throws unauthorized when user is missing or not admin", async () => {
    const req = {
      method: "GET",
      originalUrl: "/api/admin/wines",
      ip: "127.0.0.1",
      headers: { authorization: "Bearer good-token" }
    } as unknown as Request;

    vi.spyOn(jwtUtils, "verifyToken").mockReturnValue({
      userId: "user-1",
      email: "user@example.com",
      role: "USER"
    });
    findById.mockResolvedValue({
      id: "user-1",
      role: "USER"
    });

    await expect(adminAuthMiddleware(req, {} as Response, vi.fn())).rejects.toEqual(
      new AppError("Unauthorized", 401)
    );

    expect(console.warn).toHaveBeenCalledWith(
      "Admin access denied",
      expect.objectContaining({ reason: "invalid_role" })
    );
  });

  it("calls next when jwt is valid and user has admin role", async () => {
    const req = {
      method: "GET",
      originalUrl: "/api/admin/wines",
      ip: "127.0.0.1",
      headers: { authorization: "Bearer good-token" }
    } as unknown as Request;

    vi.spyOn(jwtUtils, "verifyToken").mockReturnValue({
      userId: "admin-1",
      email: "admin@example.com",
      role: "ADMIN"
    });
    findById.mockResolvedValue({
      id: "admin-1",
      role: "ADMIN"
    });

    const next = vi.fn() as NextFunction;

    await adminAuthMiddleware(req, {} as Response, next);

    expect(req.user).toEqual({
      id: "admin-1",
      email: "admin@example.com",
      role: "ADMIN"
    });
    expect(next).toHaveBeenCalledTimes(1);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("uses db role as source of truth even when jwt role says admin", async () => {
    const req = {
      method: "GET",
      originalUrl: "/api/admin/wines",
      ip: "127.0.0.1",
      headers: { authorization: "Bearer token-with-stale-admin-claim" }
    } as unknown as Request;

    vi.spyOn(jwtUtils, "verifyToken").mockReturnValue({
      userId: "user-2",
      email: "user2@example.com",
      role: "ADMIN"
    });
    findById.mockResolvedValue({
      id: "user-2",
      role: "USER"
    });

    await expect(adminAuthMiddleware(req, {} as Response, vi.fn())).rejects.toEqual(
      new AppError("Unauthorized", 401)
    );

    expect(console.warn).toHaveBeenCalledWith(
      "Admin access denied",
      expect.objectContaining({ reason: "invalid_role" })
    );
  });
});
