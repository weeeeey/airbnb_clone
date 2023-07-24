"use client";
import { SafeUser } from "../types";
interface PropertiesClientProps {
    clientUser?: SafeUser | null;
}
const PropertiesClient = ({}: PropertiesClientProps) => {
    return <div>PropertiesClient</div>;
};

export default PropertiesClient;
