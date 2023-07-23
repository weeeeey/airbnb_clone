import { getCurrentUser, getReservations } from "../actions";
import { ClientOnly, EmptyState } from "../component";
import ReservationsClientOnly from "./ReservationsClientOnly";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        );
    }
    const reservations = await getReservations({ userId: currentUser.id });
    if (!reservations) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservaions"
                    subtitle="Please reserve your trip"
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <ReservationsClientOnly
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default ReservationsPage;
