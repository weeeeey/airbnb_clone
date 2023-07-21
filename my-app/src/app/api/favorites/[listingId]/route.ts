import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(requset: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
        throw new ErrorEvent("Invaild Id");
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds.push(listingId);
    console.log(favoriteIds);
    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });
    return NextResponse.json(user);
}

export async function DELETE(
    requset: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invaild Id");
    }
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    });
    return NextResponse.json(user);
}
