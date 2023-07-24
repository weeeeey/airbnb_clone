import prisma from "../libs/prismadb";

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    bathroomCount?: number;
    roomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListing(params: IListingParams) {
    try {
        const {
            userId,
            bathroomCount,
            category,
            endDate,
            guestCount,
            locationValue,
            roomCount,
            startDate,
        } = params;

        let query: any = {};
        if (userId) {
            query.userId = userId;
        }
        if (category) {
            query.category = category;
        }
        if (locationValue) {
            query.locationValue = locationValue;
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                        ],
                    },
                },
            };
        }
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount,
            };
        }
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc",
            },
        });
        const safeListings = listings.map((list) => ({
            ...list,
            createdAt: list.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
