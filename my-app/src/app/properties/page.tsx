import { getCurrentUser } from "../actions";
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
    return (
        <Container>
            <PropertiesClient />
        </Container>
    );
};

export default PropertiesPage;
