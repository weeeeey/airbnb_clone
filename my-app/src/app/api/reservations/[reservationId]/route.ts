import { getCurrentUser } from "@/app/actions";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";

interface IParams {
    reservationId: string;
}

export async function DELETE({ params }: { params: IParams }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.error();
        }
        const reservationId = params;
        if (!reservationId || typeof reservationId !== "string") {
            throw new Error("Invaild reservaion");
        }
    } catch (error) {}
}
