import { getCurrentUser, getReservations } from "../actions";

import { ClientOnly, EmptyState } from "../component";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        );
    }
    const reservations = await getReservations({ userId: currentUser.id });
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No trips" />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient
                currentUser={currentUser}
                reservations={reservations}
            />
        </ClientOnly>
    );
};

export default TripsPage;
