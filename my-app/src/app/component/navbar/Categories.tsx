import { CategoryBox, Container } from "../";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";

const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "this is beach",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "this is windmill",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "this is ModerVilla",
    },
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();
    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((c) => (
                    <CategoryBox
                        key={c.label}
                        label={c.label}
                        icon={c.icon}
                        description={c.description}
                        selected={category === c.label}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
