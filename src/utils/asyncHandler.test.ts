import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { asyncHandler } from "@/utils/asyncHandler";

describe("asyncHandler", () => {
  it("invokes the wrapped handler", async () => {
    const handler = vi.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(handler);
    const next = vi.fn() as NextFunction;

    wrapped({} as Request, {} as Response, next);
    await Promise.resolve();

    expect(handler).toHaveBeenCalledWith(expect.anything(), expect.anything(), next);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards rejected promises to next", async () => {
    const error = new Error("failure");
    const wrapped = asyncHandler(vi.fn().mockRejectedValue(error));
    const next = vi.fn() as NextFunction;

    wrapped({} as Request, {} as Response, next);
    await Promise.resolve();

    expect(next).toHaveBeenCalledWith(error);
  });
});
