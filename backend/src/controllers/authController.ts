import { NextFunction, Request, Response } from "express";
import { generateToken } from "../utils/jwtUtils";
import { getGitHubAccessToken, getGitHubUser } from "../services/authService";
import { FRONTEND_URL, GITHUB_URL } from "../config/github";

export const redirectToGitHub = (req: Request, res: Response) => {
  const redirect_uri = `${FRONTEND_URL}/auth/github/callback`;
  const githubAuthUrl = `${GITHUB_URL}/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=user:email`;
  res.redirect(githubAuthUrl);
};

export const githubCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { code } = req.query;
    if (!code) {
      res.status(400).json({ message: "No code provided." });
      return;
    }

    const accessToken = await getGitHubAccessToken(code as string);
    if (!accessToken) {
      res.status(401).json({ message: "Invalid GitHub access token." });
      return;
    }

    const user = await getGitHubUser(accessToken);
    if (!user) {
      res.status(401).json({ message: "Invalid GitHub user data." });
      return;
    }
    const token = generateToken({ id: user.id, username: user.login });

    console.log("🔑 Token JWT gerado:", token);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    // return res.redirect(`${FRONTEND_URL}/dashboard`);
    res.json({ message: "Login successful.", token });
    return;
  } catch (error) {
    next(error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};

export const getUserInfo = (req: Request, res: Response) => {
  res.json({ id: req.user?.id, username: req.user?.username }); //TODO: fix error with TypeScript `npm run dev`
};
