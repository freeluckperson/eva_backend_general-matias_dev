import express from "express";
import { getSessionToken, getRespuesta } from "../controllers/niubiz.controller.js";

const routerNiubiz = express.Router();


routerNiubiz.post("/getsession", getSessionToken);
routerNiubiz.post("/respuesta", getRespuesta)

export default routerNiubiz;
