import { Prisma } from "@prisma/client";
import type { NextFunction, Response } from "express";
import { z } from "zod";
import { describe, expect, it, vi } from "vitest";
import { errorHandler } from "@/middleware/errorHandler";
import { AppError } from "@/utils/appError";

function createResponse() {
  const res = {
    status: vi.fn(),
    json: vi.fn()
  } as unknown as Response;

  vi.mocked(res.status).mockReturnValue(res);
  vi.mocked(res.json).mockReturnValue(res);

  return res;
}

describe("errorHandler", () => {
  it("returns the status code and message for app errors", () => {
    const res = createResponse();

    errorHandler(new AppError("Unauthorized", 401), {} as never, res, vi.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("returns validation details for zod errors", () => {
    const res = createResponse();
    let error: unknown;

    try {
      z.string().parse(123);
    } catch (caught) {
      error = caught;
    }

    errorHandler(error, {} as never, res, vi.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation failed",
        issues: expect.any(Array)
      })
    );
  });

  it("returns prisma metadata for known prisma request errors", () => {
    const res = createResponse();
    const error = new Prisma.PrismaClientKnownRequestError("Unique constraint failed", {
      code: "P2002",
      clientVersion: "test",
      meta: {
        target: ["email"]
      }
    });

    errorHandler(error, {} as never, res, vi.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Database request failed",
      code: "P2002",
      meta: {
        target: ["email"]
      }
    });
  });

  it("returns 500 for unknown errors", () => {
    const res = createResponse();

    errorHandler(new Error("boom"), {} as never, res, vi.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
