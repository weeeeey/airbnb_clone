import { SafeListing, SafeUser } from '@/app/types';
import LisingCard from '../component/listings/LisingCard';
import { Heading, Container } from '../component';

interface FavoritesClientProps {
    currentUser?: SafeUser | null;
    favoriteListings: SafeListing[];
}

const FavoritesClient = ({
    currentUser,
    favoriteListings,
}: FavoritesClientProps) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subTitle="List of places you have favorited"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {favoriteListings.map((listing: any) => (
                    <LisingCard
                        key={listing.id}
                        data={listing}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default FavoritesClient;
