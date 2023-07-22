"use client";

import { SafeUser } from "@/app/types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useFavorite } from "../hooks";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
    });
    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-60 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={32}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={28}
                className={` ${
                    hasFavorited ? "fill-rose-500" : "fill-neutral-500/70 "
                }`}
            />
        </div>
    );
};

export default HeartButton;
