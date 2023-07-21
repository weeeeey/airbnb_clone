"use client";

import { useCallback, useMemo } from "react";
import { Reservation } from "@prisma/client";
import { SafeUser, SafeListings } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCountries } from "@/app/hooks";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListings;
    currentUser?: SafeUser | null;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}
const LisingCard = ({
    data,
    currentUser,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
}: ListingCardProps) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }
            onAction?.(actionId);
        },
        [onAction, actionId, disabled]
    );

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, "PP")} ~ ${format(end, "PP")}`;
    }, [reservation]);
    return (
        <div
            className="col-span-1 cursor-pointer group"
            onClick={() => {
                router.push(`listings/${data.id}`);
            }}
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        alt="Listing"
                        src={data.imageSrc}
                        fill
                        className="object-cover h-full w-full transition group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                {location && (
                    <div className="font-semibold text-lg text-neutral-500">
                        {location.label} ({location.region})
                    </div>
                )}
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">${price}</div>
                    {!reservation && <div className="font-light">night</div>}
                </div>
                {onAction && actionLabel && (
                    <Button
                        label={actionLabel}
                        onClick={handleCancel}
                        small
                        disabled={disabled}
                    />
                )}
            </div>
        </div>
    );
};

export default LisingCard;
