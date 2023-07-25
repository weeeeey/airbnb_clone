import { getCurrentUser } from "../actions";
import getListings from "../actions/getListing";
import { Container, EmptyState, Heading } from "../component";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <Container>
                <EmptyState title="Unauthorized" subtitle="Please Login" />
            </Container>
        );
    }
    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {
        return (
            <Container>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you have no properties"
                />
            </Container>
        );
    }
    return (
        <Container>
            <PropertiesClient currentUser={currentUser} Properties={listings} />
        </Container>
    );
};

export default PropertiesPage;
