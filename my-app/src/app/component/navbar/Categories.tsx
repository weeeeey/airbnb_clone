'use client';
import { CategoryBox, Container } from '../';
import { usePathname, useSearchParams } from 'next/navigation';

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { BsSnow } from 'react-icons/bs';
import {
    GiCaveEntrance,
    GiBoatFishing,
    GiIsland,
    GiWindmill,
    GiCastle,
    GiForestCamp,
    GiCactus,
    GiBarn,
} from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!',
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is has windmills!',
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!',
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!',
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!',
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!',
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!',
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!',
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is an ancient castle!',
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!',
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!',
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!',
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!',
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!',
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!',
    },
];
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    const slideOnLeft = () => {
        const a = document.getElementById('content');
        if (a) {
            a.scrollLeft -= 400;
        }
    };
    const slideOnRight = () => {
        const a = document.getElementById('content');
        if (a) {
            a.scrollLeft += 400;
        }
    };
    return (
        <Container>
            <div
                id="content"
                className="pt-4 flex flex-row items-center justify-between overflow-x-auto scrollbar-hide relative"
            >
                {categories.map((c) => (
                    <CategoryBox
                        key={c.label}
                        label={c.label}
                        icon={c.icon}
                        description={c.description}
                        selected={category === c.label}
                    />
                ))}
                <AiOutlineLeft
                    className="text-neutral-400 hover:text-neutral-800 hover:bg-slate-200 h-full absolute left-0 hover:bg-opacity-50"
                    onClick={slideOnLeft}
                />
                <AiOutlineRight
                    className="text-neutral-400 hover:text-neutral-800 hover:bg-slate-200 h-full absolute right-0 hover:bg-opacity-50 "
                    onClick={slideOnRight}
                />
            </div>
        </Container>
    );
};

export default Categories;
