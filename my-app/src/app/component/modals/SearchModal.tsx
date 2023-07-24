"use client";
import qs from "query-string";
import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useSearchModal } from "../../hooks";
import { Modal } from ".";
import { Heading } from "..";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Calender from "../Calender";
import { Counter } from "../inputs";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [isLoading, setIsLoading] = useState(false);

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });
    const Map = useMemo(
        () =>
            dynamic(() => import("../Map"), {
                ssr: false,
            }),
        [location]
    );

    const onNext = useCallback(() => {
        setStep((p) => p + 1);
    }, []);

    const onBack = useCallback(() => {
        setStep((p) => p - 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }
        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );
        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [
        step,
        searchModal,
        location,
        router,
        guestCount,
        bathroomCount,
        roomCount,
        dateRange,
        onNext,
        params,
    ]);
    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search";
        }
        return "Next";
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you want to go?"
                subTitle="Find the perfect location"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subTitle="Make sure everyone is free!"
                />
                <Calender
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subTitle="Find your perfect place"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(v) => setGuestCount(v)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(v) => setRoomCount(v)}
                />
                <Counter
                    title="Bathroom"
                    subtitle="How many bathroom do you need?"
                    value={bathroomCount}
                    onChange={(v) => setBathroomCount(v)}
                />
            </div>
        );
    }
    return (
        <div>
            <Modal
                disabled={isLoading}
                title="Filters"
                actionLabel={actionLabel}
                secondaryAcion={step === STEPS.LOCATION ? undefined : onBack}
                secondaryAcionLabel={secondaryActionLabel}
                isOpen={searchModal.isOpen}
                onClose={searchModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
            />
        </div>
    );
};

export default SearchModal;
