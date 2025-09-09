import { Router } from "express";
import {
  getFaceitMatchRoomController,
  getFaceitCdnImage,
} from "../controllers/index.js";

export const faceitRoutes = Router();

/* Faceit API */
faceitRoutes.get("/faceit/images", getFaceitCdnImage);
faceitRoutes.get("/faceit/match/:id", getFaceitMatchRoomController);
