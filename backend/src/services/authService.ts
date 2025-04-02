import axios from "axios";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_URL,
  GITHUB_API_URL,
} from "../config/github";

export const getGitHubAccessToken = async (
  code: string
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${GITHUB_URL}/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.data.access_token || null;
  } catch (error) {
    console.error("Error fetching GitHub access token:", error);
    return null;
  }
};

export const getGitHubUser = async (
  accessToken: string
): Promise<any | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user data:", error);
    return null;
  }
};
