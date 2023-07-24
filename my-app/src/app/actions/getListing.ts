import prisma from "../libs/prismadb";

export interface IListingParams {
    userId?: string;
}

export default async function getListing(params: IListingParams) {
    try {
        const { userId } = params;

        let query: any = {};
        if (userId) {
            query.userId = userId;
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
