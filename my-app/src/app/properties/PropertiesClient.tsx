"use client";
import { SafeListing, SafeUser } from "@/app/types";
import { Container, Heading } from "../component";
import LisingCard from "../component/listings/LisingCard";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface PropertiesProps {
    currentUser?: SafeUser | null;
    Properties: SafeListing[];
}

const PropertiesClient = ({ currentUser, Properties }: PropertiesProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);
            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success("Properties delete");
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
            <Heading title="Properties" subTitle="Lisi of your properties" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {Properties?.map((property) => (
                    <LisingCard
                        key={property.id}
                        currentUser={currentUser}
                        data={property}
                        disabled={deletingId === property.id}
                        actionId={property.id}
                        actionLabel="Delete property"
                        onAction={onCancel}
                    />
                ))}
            </div>
        </Container>
    );
};

export default PropertiesClient;
