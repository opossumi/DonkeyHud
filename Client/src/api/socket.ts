import { io } from "socket.io-client";
import { GSI } from "./HUD";
import { apiUrl } from "./api";

export const socket = io(`${apiUrl}`);

socket.on("update", (data) => {
  GSI.digest(data);
});
