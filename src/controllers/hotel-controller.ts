import hoterRepository from "@/repositories/hotel-repository";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import hotelService from "@/services/hotel-service";
import httpStatus from "http-status";

export async function listHotels(req:AuthenticatedRequest, res: Response) {
    const { userId } = req
try {
    const hotels = await hotelService.getHotels(Number (userId));
    return res.status(httpStatus.OK).send (hotels)
} catch (error) {
    if (error.name === "NotFound"){
        return res.sendStatus (httpStatus.NOT_FOUND)
    }
}
}

export async function listHotelsRoom(req:AuthenticatedRequest, res: Response) {
    const { userId } = req
    const { hotelId } = req.params
try {
    const hotels = await hotelService.getHotelsRooms(Number (userId), Number (hotelId));
    return res.status(httpStatus.OK).send (hotels)
} catch (error) {
    if (error.name === "NotFound"){
        return res.sendStatus (httpStatus.NOT_FOUND)
    }
}
}