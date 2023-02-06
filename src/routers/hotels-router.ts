import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listHotels, listHotelsRoom } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", listHotels)
  .get ("/:hotelId", listHotelsRoom)


export { hotelsRouter };
