"use client";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";

import { Container, ListingHead, ListingInfo } from "@/app/component";
import { categories } from "@/app/component/navbar/Categories";

import { useLoginModal } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

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
    reservations = [],
}: LisintingClientProps) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });
            dates = [...dates, ...range];
        });
        return dates;
    }, [reservations]);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios
            .post(`/api/reservations`, {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing.id,
            })
            .then(() => {
                toast.success("Lisiting reserved!");
                setDateRange(initialDateRange);
                router.refresh();
            })
            .catch(() => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentUser, dateRange, listing.id, loginModal, router, totalPrice]);
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const daycount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if (daycount && listing.price) {
                setTotalPrice(daycount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

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
