import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions";
import { toast } from "react-hot-toast";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const body = await req.json();
    const { totalPrice, startDate, endDate, listingId } = body;
    if (!totalPrice || !startDate || !endDate || !listingId) {
        return NextResponse.error();
    }
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    totalPrice,
                    startDate,
                    endDate,
                    userId: currentUser.id,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
