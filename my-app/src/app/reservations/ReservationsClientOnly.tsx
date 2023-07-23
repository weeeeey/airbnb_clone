"use client";
import { SafeReservation, SafeUser } from "@/app/types";
import { Heading, Container } from "../component";
import LisingCard from "../component/listings/LisingCard";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface ReservationsClientOnlyProps {
    currentUser?: SafeUser | null;
    reservations: SafeReservation[];
}
const ReservationsClientOnly = ({
    reservations,
    currentUser,
}: ReservationsClientOnlyProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);
            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success("Reservation canceled");
                    router.refresh();
                })
                .catch(() => {
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    setDeletingId("");
                });
        },
        [router]
    );
    return (
        <Container>
            <Heading
                title="Reservations"
                subTitle="Bookins on your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <LisingCard
                        key={reservation.id}
                        currentUser={currentUser}
                        reservation={reservation}
                        data={reservation.listing}
                        actionId={reservation.id}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        onAction={onCancel}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ReservationsClientOnly;
