import prisma from "../libs/prismadb";

interface IParams {
    userId?: string;
    listingId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { authorId, listingId, userId } = params;
        const query: any = {};
        if (listingId) {
            query.listingId = listingId;
        }
        if (userId) {
            query.userId = userId;
        }
        if (authorId) {
            query.listing = { userId: authorId };
        }
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const safeReservations = reservations.map((reser) => ({
            ...reser,
            createdAt: reser.createdAt.toISOString(),
            startDate: reser.startDate.toISOString(),
            endDate: reser.endDate.toISOString(),
            listing: {
                ...reser.listing,
                createdAt: reser.listing.createdAt.toISOString(),
            },
        }));
        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}
