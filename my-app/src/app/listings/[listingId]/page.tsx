import { getCurrentUser } from "@/app/actions";
import getListingById from "@/app/actions/getListingById";
import { ClientOnly, Container, EmptyState } from "@/app/component";
import LisintingClient from "@/app/listings/[listingId]/LisintingClient";
import Image from "next/image";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <LisintingClient currentUser={currentUser} listing={listing} />
        </ClientOnly>
    );
};

export default ListingPage;

// 요건 server side에서 작동 중이고 [listingId]를 통해 param을 이미 알고 있으므로
// useRouter(client side에서 작동하는 use hook) 사용 x
// direct communicate를 통해 따옴
