"use client";
import { useRentModal } from "../../hooks";
import { Modal } from ".";

const RentModal = () => {
    const rentModal = useRentModal();

    const body = <>asd</>;
    return (
        <div>
            <Modal
                isOpen={rentModal.isOpen}
                onClose={rentModal.onClose}
                onSubmit={rentModal.onClose}
                title="Airbnb your home"
                actionLabel="Submit"
                body={body}
            />
        </div>
    );
};

export default RentModal;
