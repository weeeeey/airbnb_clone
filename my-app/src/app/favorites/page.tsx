import { getCurrentUser } from '../actions';
import getFavoriteListings from '../actions/getFavoriteListings';
import { ClientOnly, EmptyState } from '../component';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();
    const favoriteListings = await getFavoriteListings();

    if (typeof window === 'undefined') {
        return null;
    }
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </ClientOnly>
        );
    }

    if (favoriteListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favorite found"
                    subtitle="Looks like you have no favorite listings"
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <FavoritesClient
                favoriteListings={favoriteListings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default FavoritesPage;
