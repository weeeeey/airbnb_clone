import { User, Listing } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    emailVerified: string | null;
    createdAt: string;
    updatedAt: string;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};
