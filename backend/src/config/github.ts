import dotenv from "dotenv";

dotenv.config();

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const BACKEND_URL = process.env.BACKEND_URL as string;
export const GITHUB_URL = process.env.GITHUB_URL as string;
export const GITHUB_API_URL = process.env.GITHUB_API_URL as string;
