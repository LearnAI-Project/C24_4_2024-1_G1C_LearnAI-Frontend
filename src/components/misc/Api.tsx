import axios, { AxiosInstance, AxiosResponse } from "axios";
import { config } from "../../../Constants";

interface UserDTO {
  id: string;
  username: string;
  email: string;
}

interface AuthenticateUser {
  username: string;
  password: string;
}

interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

interface ThemeRequest {
  name: string;
}

interface ApiResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface MessageResponse {
  message: string;
}

interface TitleResponse {
  title: string;
}

interface RoadmapResponse {
  roadmap: string[];
}

interface SyllabusResponse {
  syllabus: string[];
}

interface SummaryResponse {
  summary: string;
}

interface ExportThemeResponse {
  message: string;
}

// -- Spring API

const springInstance: AxiosInstance = axios.create({
  baseURL: config.url.API_BACKEND_SPRING,
});

function getCurrentUser(): Promise<AxiosResponse<UserDTO>> {
  return springInstance.get("/me", {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function authenticate(
  user: AuthenticateUser
): Promise<AxiosResponse<ApiResponse>> {
  return springInstance.post("/auth/login", user, {
    headers: { "Content-Type": "application/json" },
  });
}

function register(user: RegisterUser): Promise<AxiosResponse<ApiResponse>> {
  return springInstance.post("/auth/register", user, {
    headers: { "Content-Type": "application/json" },
  });
}

function verifyAccount(code: number): Promise<AxiosResponse<MessageResponse>> {
  return springInstance.put(
    "/auth/verify",
    { code },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

function recoverYourAccount(
  code: number,
  newPassword: string
): Promise<AxiosResponse<MessageResponse>> {
  return springInstance.put(
    "/auth/recover-password",
    { code, newPassword },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

function deleteUser(username: string): Promise<AxiosResponse<ApiResponse>> {
  return springInstance.delete(`/api/users/${username}`, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function forgotPassword(email: string): Promise<AxiosResponse<string>> {
  return springInstance.post(
    "/auth/forgot-password",
    { email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

function createTheme(
  themeRequest: ThemeRequest
): Promise<AxiosResponse<MessageResponse>> {
  return springInstance.post("/api/user/theme", themeRequest, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

function exportTheme(
  themeId: number
): Promise<AxiosResponse<ExportThemeResponse>> {
  return springInstance.post(`/api/user/export/${themeId}`, null, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });
}

// -- Django API

const djangoInstance: AxiosInstance = axios.create({
  baseURL: config.url.API_BACKEND_DJANGO,
});

function getTitle(theme: string): Promise<AxiosResponse<TitleResponse>> {
  return djangoInstance.post(
    "/api-ai/get_title/",
    { theme },
    {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    }
  );
}

function getRoadmap(theme: string): Promise<AxiosResponse<RoadmapResponse>> {
  return djangoInstance.post(
    "/api-ai/get_roadmap/",
    { theme },
    {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    }
  );
}

function getSyllabus(
  theme: string,
  roadmap: string[]
): Promise<AxiosResponse<SyllabusResponse>> {
  return djangoInstance.post(
    "/api-ai/get_syllabus/",
    { theme, roadmap },
    {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    }
  );
}

function getSummary(
  topic: string,
  subtopic: string
): Promise<AxiosResponse<SummaryResponse>> {
  return djangoInstance.post(
    "/api-ai/get_summary/",
    { topic, subtopic },
    {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    }
  );
}

// -- Helper functions

function authHeader(): { Authorization: string } | object {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) {
    user = JSON.parse(userStr);
  }
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

export const Api = {
  authenticate,
  register,
  verifyAccount,
  recoverYourAccount,
  deleteUser,
  forgotPassword,
  getTitle,
  getRoadmap,
  getSyllabus,
  getSummary,
  getCurrentUser,
  createTheme,
  exportTheme,
};
