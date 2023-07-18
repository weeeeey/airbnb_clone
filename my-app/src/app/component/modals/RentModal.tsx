"use client";
import { useRentModal } from "../../hooks";
import { Modal } from ".";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const onNext = () => {
        setStep((v) => v + 1);
    };
    const onBack = () => {
        setStep((v) => v - 1);
    };
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            locationValue: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    }); //schema. Listing
    const category = watch("category");
    const location = watch("location");

    const setCustomValue = (id: string, value: any) => {
        // code
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create";
        }
        return "Next";
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContet = <></>;
    if (step === STEPS.CATEGORY) {
        bodyContet = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Which of these best dexcribe your place?"
                    subTitle="Pick a category"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto scrollbar-hide">
                    {categories.map((item) => (
                        <CategoryInput
                            icon={item.icon}
                            // category는 watch를 통해 내가 지켜보고 있는 그것
                            onClick={(cate) => {
                                setCustomValue("category", cate);
                            }}
                            selected={category === item.label}
                            label={item.label}
                            key={item.label}
                        />
                    ))}
                </div>
            </div>
        );
    }
    if (step === STEPS.LOCATION) {
        bodyContet = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subTitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}
                />
            </div>
        );
    }
    return (
        <div>
            <Modal
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={onNext}
                title="Airbnb your home"
                actionLabel={actionLabel}
                secondaryAcionLabel={secondaryActionLabel}
                secondaryAcion={step === STEPS.CATEGORY ? undefined : onBack}
                body={bodyContet}
            />
        </div>
    );
};

export default RentModal;
