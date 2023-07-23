import { getCurrentUser } from "../actions";
import { ClientOnly, EmptyState } from "../component";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        );
    }
    const favoriteIds = currentUser.favoriteIds;
    if (!favoriteIds) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favorite listing"
                    subtitle="Click Heartbutton listing"
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <FavoritesClient
                favoriteIds={favoriteIds}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default FavoritesPage;
