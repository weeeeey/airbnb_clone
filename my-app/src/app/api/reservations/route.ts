import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions";
import { toast } from "react-hot-toast";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return toast.error("You login account ");
    }
    const body = await req.json();
    const { totalPrice, startDate, endDate, listingId } = body;
    try {
        const reservation = await prisma.reservation.create({
            data: {
                totalPrice,
                startDate,
                endDate,
                listingId,
                userId: currentUser.id,
            },
        });
        return NextResponse.json(reservation);
    } catch (error: any) {
        return toast.error(error);
    }
}
