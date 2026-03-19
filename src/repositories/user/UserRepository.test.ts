import { describe, expect, it, vi } from "vitest";
import { UserRepository } from "@/repositories/user/UserRepository";

describe("UserRepository", () => {
  it("findByEmail queries the user by email", async () => {
    const findUnique = vi.fn().mockResolvedValue(null);
    const prisma = {
      user: {
        findUnique
      }
    } as never;

    const repository = new UserRepository(prisma);

    await repository.findByEmail("user@example.com");

    expect(findUnique).toHaveBeenCalledWith({
      where: { email: "user@example.com" }
    });
  });

  it("create forwards the user input", async () => {
    const create = vi.fn().mockResolvedValue(null);
    const prisma = {
      user: {
        create
      }
    } as never;

    const repository = new UserRepository(prisma);
    const input = {
      email: "user@example.com",
      password: "hashed-password",
      name: "User"
    };

    await repository.create(input);

    expect(create).toHaveBeenCalledWith({ data: input });
  });
});
