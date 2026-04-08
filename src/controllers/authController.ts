import type { Request, Response } from "express";
import { AuthService } from "@/services/authService";

export class AuthController {
  public constructor(private readonly authService: AuthService) { }

  public authenticateWithGoogle = async (req: Request, res: Response) => {
    const result = await this.authService.authenticateWithGoogle(req.body);
    res.status(200).json(result);
  };
}
