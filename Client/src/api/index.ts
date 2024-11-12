import axios, { AxiosRequestConfig } from "axios";
import * as Types from "./types";
import { MapConfig } from "../HUD/Radar/LexoRadar/maps";

// Gets the current windows address and returns the port query (not sure if its needed for ours)
const query = new URLSearchParams(window.location.search);

// If there is a port query in the url, set it to port, if not use hard coded port
export const port = Number(query.get("port") || 4000);

export const isDev = !query.get("isProd");

// Set the url for the API
export const config = { apiAddress: isDev ? `http://localhost:${port}/` : "/" };
export const apiUrl = config.apiAddress;

// Function template to preform get request to api using axios.
export const apiRequest = async (url: string, method = "GET", body?: any) => {
  const options: RequestInit = {
    method,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  let data: any = null;
  return fetch(`${apiUrl}api/${url}`, options).then((res) => {
    data = res;
    return res.json().catch((_e) => data && data.status < 300);
  });
};

// API functions for each object to be used throughout the application
export const api = {
  matches: {
    getAll: async (): Promise<Types.Match[]> => apiRequest(`matches`),
    getCurrent: async (): Promise<Types.Match> => apiRequest(`matches/current`),
  },
  teams: {
    getAll: async (): Promise<Types.Team[]> => apiRequest(`teams`),
    getTeam: async (id: string): Promise<Types.Team> =>
      apiRequest(`teams/${id}`),
  },
  players: {
    getAll: async (steamids?: string[]): Promise<Types.Player[]> =>
      apiRequest(
        steamids ? `players?steamids=${steamids.join(";")}` : `players`,
      ),
    getAvatarURLs: async (
      steamid: string,
    ): Promise<{ custom: string; steam: string }> =>
      apiRequest(`players/avatar/steamid/${steamid}`),
  },
  maps: {
    get: (): Promise<{ [key: string]: MapConfig }> => apiRequest("radar/maps"),
  },
};
