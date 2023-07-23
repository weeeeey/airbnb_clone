import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions";
import prisma from "@/app/libs/prismadb";
import { toast } from "react-hot-toast";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.error();
        }
        const { reservationId } = params;
        if (!reservationId || typeof reservationId !== "string") {
            throw new Error("Invaild reservaion");
        }
        const reservaion = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [
                    { userId: user.id },
                    {
                        listing: { userId: user.id },
                    },
                    // listing의 주인도 삭제 하고 싶을 수 있는 경우
                ],
            },
        });
        return NextResponse.json(reservaion);
    } catch (error) {
        throw new Error("error");
    }
}
