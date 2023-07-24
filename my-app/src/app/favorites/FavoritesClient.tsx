"use client";
import { SafeListing, SafeUser } from "@/app/types";
import LisingCard from "../component/listings/LisingCard";
import { Heading, Container } from "../component";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface FavoritesClientProps {
    currentUser?: SafeUser | null;
    favoriteListings: SafeListing[];
}

const FavoritesClient = ({
    currentUser,
    favoriteListings,
}: FavoritesClientProps) => {
    const [deleteId, setDeleteId] = useState("");
    const router = useRouter();

    const onCancel = useCallback(
        (id: string) => {
            setDeleteId(id);
            axios
                .delete(`/api/favorites/${id}`)
                .then(() => {
                    toast.success("Success cancel");
                    router.refresh();
                })
                .catch(() => {
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    setDeleteId("");
                });
        },
        [router]
    );
    return (
        <Container>
            <Heading
                title="Favorites"
                subTitle="List of places you have favorited"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {favoriteListings.map((listing) => (
                    <LisingCard
                        key={listing.id}
                        data={listing}
                        currentUser={currentUser}
                        onAction={onCancel}
                        disabled={listing.id === deleteId}
                        actionId={listing.id}
                        actionLabel="cancel"
                    />
                ))}
            </div>
        </Container>
    );
};

export default FavoritesClient;
