import { ClientOnly, Container, EmptyState } from "./component";
import LisingCard from "./component/listings/LisingCard";

import { getCurrentUser, getListing } from "./actions";
import { IListingParams } from "@/app/actions/getListing";

interface HomeProps {
    searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
    const currentUser = await getCurrentUser();
    const listings = await getListing(searchParams);

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset />
            </ClientOnly>
        );
    }
    return currentUser ? (
        <ClientOnly>
            <Container>
                <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {listings.map((listing: any) => {
                        return (
                            <LisingCard
                                key={listing.id}
                                currentUser={currentUser}
                                data={listing}
                            />
                        );
                    })}
                </div>
            </Container>
        </ClientOnly>
    ) : (
        <></>
    );
}
