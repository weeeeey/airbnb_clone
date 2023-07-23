"use client";
import { SafeUser } from "@/app/types";
import LisingCard from "../component/listings/LisingCard";
import { Heading, Container } from "../component";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getListing } from "../actions";

interface FavoritesClientProps {
    currentUser?: SafeUser | null;
    favoriteIds: string[];
}

const FavoritesClient = ({
    currentUser,
    favoriteIds,
}: FavoritesClientProps) => {
    const [deleteId, setDeleteId] = useState("");
    const router = useRouter();
    const listings = getListing();
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
                subTitle="you've been clicked listings"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {favoriteIds.map((faId) => (
                    <LisingCard
                        data={faId}
                        currentUser={currentUser}
                        onAction={onCancel}
                        disabled={faId === deleteId}
                    />
                ))}
            </div>
        </Container>
    );
};

export default FavoritesClient;
