"use client";

import { Range } from "react-date-range";
import Calender from "../Calender";
import Button from "../Button";

interface ListingReservationProps {
    price: number;
    totlaPrice: number;
    // dateRange: { startDate: Date; endDate: Date; key: string };
    dateRange: Range;
    // value: {
    //     startDate: Date;
    //     endDate: Date;
    //     key: string;
    // }
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}
const ListingReservation = ({
    price,
    totlaPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates,
}: ListingReservationProps) => {
    return (
        // md:order-last md:col-span-3
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4 ">
                <div className=" text-2xl font-semibold ">$ {price}</div>
                <div className=" text-neutral-600 font-light "> night</div>
            </div>
            <hr />
            <Calender
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    label="Reserve"
                    onClick={onSubmit}
                    disabled={disabled}
                />{" "}
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>$ {totlaPrice}</div>
            </div>
        </div>
    );
};

export default ListingReservation;
