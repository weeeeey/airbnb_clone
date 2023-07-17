import { IconType } from "react-icons";

interface CategoryProps {
    label: string;
    icon: IconType;
    description: string;
    selected?: boolean;
}

const CategoryBox = ({ label, description, icon, selected }: CategoryProps) => {
    return (
        <div
            className={`
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer`}
        >
            CategoryBox
        </div>
    );
};

export default CategoryBox;
