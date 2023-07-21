import prisma from "../libs/prismadb";

export default async function getListing(id: string = "") {
    try {
        if (id !== "") {
            const list = await prisma.listing.findMany({
                where: {
                    userId: id,
                },
            });
            return list;
        }
        const listing = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return listing;
    } catch (error: any) {
        throw new Error(error);
    }
}
