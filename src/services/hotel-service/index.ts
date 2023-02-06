import hoterRepository  from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { RESERVED_NUMBERS } from "@brazilian-utils/brazilian-utils/dist/utilities/pis";

async function getHotels (userId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId (userId);
    if (!enrollment) {
        return notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId (enrollment.id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
        return notFoundError();
    } 

    const hotels = await hoterRepository.findHotels();
    return hotels;
}

async function getHotelsRooms (userId: number, hotelId: number) {

    const enrollment = await enrollmentRepository.findWithAddressByUserId (userId);
    if (!enrollment) {
        return notFoundError();
    }

    const ticket = await ticketRepository.findTicketByEnrollmentId (enrollment.id);
    if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel){
        return notFoundError();
    } 

    const hotels = await hoterRepository.findRoomsById(hotelId);
    return hotels;
}

const hotelService = {
    getHotels,
    getHotelsRooms
}

export default hotelService;