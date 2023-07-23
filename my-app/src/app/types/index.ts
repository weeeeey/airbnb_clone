import { User, Listing, Reservation } from '@prisma/client';

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    emailVerified: string | null;
    createdAt: string;
    updatedAt: string;
};

export type SafeListing = Omit<Listing, 'createdAt'> & {
    createdAt: string;
};
export type SafeReservation = Omit<
    Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    endDate: string;
    startDate: string;
    createdAt: string;
    listing: SafeListing;
};
