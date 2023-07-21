"use client";

import { Container, ListingHead, ListingInfo } from "@/app/component";
import { categories } from "@/app/component/navbar/Categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";

interface LisintingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const LisintingClient = ({
    listing,
    currentUser,
    reservations,
}: LisintingClientProps) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        currentUser={currentUser}
                        id={listing.id}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            bathroomCount={listing.bathroomCount}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default LisintingClient;
