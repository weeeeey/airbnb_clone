"use client";

import { SafeUser } from "@/app/types";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
    const hasFavoriterd = false;
    const toggleFavorite = () => {};
    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={24}
                className={` ${
                    hasFavoriterd ? "fill-rose-500" : "fill-neutral-500/70"
                }`}
            />
        </div>
    );
};

export default HeartButton;
