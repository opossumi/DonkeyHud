import { Router } from "express";
import {
  getSettingsController,
  updateSettingsController,
} from "../controllers/index.js";

export const settingsRoutes = Router();

/* Settings */
settingsRoutes.get("/coaches", getSettingsController);
settingsRoutes.put("/coaches", updateSettingsController);
