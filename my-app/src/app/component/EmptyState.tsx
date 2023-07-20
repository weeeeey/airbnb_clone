"use client";

import { useRouter } from "next/navigation";
import { Button, Heading } from "./";

interface EmpthStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset,
}: EmpthStateProps) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
            <Heading center title={title} subTitle={subtitle} />
            <div className="w-48 mt-4">
                <Button
                    label="Remove all filters"
                    onClick={() => {
                        router.push("/");
                    }}
                    outline
                />
            </div>
        </div>
    );
};

export default EmptyState;
