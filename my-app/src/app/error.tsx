"use client";
import { useEffect } from "react";
import { EmptyState } from "./component";

interface ErrorProp {
    error: Error;
}
const Error = ({ error }: ErrorProp) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return <EmptyState title="NO" subtitle="Something went wrong" />;
};

export default Error;
