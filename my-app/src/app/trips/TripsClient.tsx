"use client";

import { SafeReservation, SafeUser } from "@/app/types";
import { Container, Heading } from "../component";
import LisingCard from "../component/listings/LisingCard";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface TripsClientProps {
    currentUser?: SafeUser | null;
    reservations: SafeReservation[];
}

const TripsClient = ({ currentUser, reservations }: TripsClientProps) => {
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
                .catch((error) => {
                    toast.error(error.response.data.error);
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
                title="Trips"
                subTitle="Where you've been and where you're going"
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

export default TripsClient;
