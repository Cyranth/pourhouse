import type { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByGoogleSubject(googleSubject: string): Promise<User | null>;
  updateGoogleIdentityById(input: {
    userId: string;
    googleSubject: string;
    name: string;
  }): Promise<User>;
  create(input: Prisma.UserCreateInput): Promise<User>;
}
