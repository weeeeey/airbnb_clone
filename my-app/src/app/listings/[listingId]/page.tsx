import getListingById from "@/app/actions/getListingById";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    console.log(params);
    return <div>{listing?.category}</div>;
};

export default ListingPage;

// 요건 server side에서 작동 중이고 [listingId]를 통해 param을 이미 알고 있으므로
// useRouter(client side에서 작동하는 use hook) 사용 x
// direct communicate를 통해 따옴
