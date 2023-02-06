import { prisma } from "@/config"

async function findHotels() {
    return prisma.hotel.findMany();
}

async function findRoomsById(hotelId: number) {
    return prisma.room.findMany({
        where:{
            hotelId,
        }
    });
}


const hoterRepository = {
    findHotels,
    findRoomsById

}

export default hoterRepository;