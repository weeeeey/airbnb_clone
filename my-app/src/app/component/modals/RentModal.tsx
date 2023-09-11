'use client';
import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Modal } from '.';
import { useRentModal } from '../../hooks';
import { categories } from '../navbar/Categories';
import { CategoryInput, CountrySelect, Counter, ImageUpload } from '../inputs';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Heading, Input } from '../';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
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
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    }); //schema. Listing
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }
        setIsLoading(true);
        axios
            .post('/api/listings', data)

            .then(() => {
                toast.success('Listing Created!');
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const Map = useMemo(
        () => dynamic(() => import('../Map'), { ssr: false }),
        [location]
    );

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
            return 'Create';
        }
        return 'Next';
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
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
                                setCustomValue('category', cate);
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
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }
    if (step === STEPS.INFO) {
        bodyContet = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subTitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guest do you allow?"
                    onChange={(value) => setCustomValue('guestCount', value)}
                    value={guestCount}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    onChange={(value) => setCustomValue('roomCount', value)}
                    value={roomCount}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you allow?"
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                    value={bathroomCount}
                />
            </div>
        );
    }
    if (step === STEPS.IMAGES) {
        bodyContet = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subTitle="Show guests what your place looks like"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
            </div>
        );
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContet = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place"
                    subTitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    errors={errors}
                    register={register}
                    required
                    disabled={isLoading}
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    errors={errors}
                    register={register}
                    required
                    disabled={isLoading}
                />
            </div>
        );
    }
    if (step === STEPS.PRICE) {
        bodyContet = (
            <div className=" flex flex-col gap-8">
                <Input
                    formatPrice
                    type="number"
                    id="price"
                    label="Price"
                    errors={errors}
                    register={register}
                    disabled={isLoading}
                    required
                />
            </div>
        );
    }
    return (
        <div>
            <Modal
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
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
