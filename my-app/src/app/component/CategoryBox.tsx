"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { useCallback } from "react";
import qs from "query-string";

interface CategoryProps {
    label: string;
    icon: IconType;
    description: string;
    selected?: boolean;
}

const CategoryBox = ({
    label,
    description,
    icon: Icon,
    selected,
}: CategoryProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currencyQuery = {};
        if (params) {
            currencyQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currencyQuery,
            category: label,
        };
        if (params?.get("category") === label) {
            delete updatedQuery.category;
        }
        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );
        router.push(url);
    }, [label, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-neutral-800" : "text-neutral-500"}
            flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer`}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
};

export default CategoryBox;
