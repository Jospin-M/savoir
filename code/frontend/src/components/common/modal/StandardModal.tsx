import ModalHeader from "../../common/modal/ModalHeader.tsx";
import ModalBody from "../../common/modal/ModalBody.tsx";
import Modal from "../../common/modal/Modal.tsx";
import SaveButton from "./SaveButton.tsx";

import type { FormEventHandler, ReactNode } from "react";

export default function StandardModal(
    { title, onClose, onSubmit, children, isDisabled }:
    { title: string, onClose: () => void, onSubmit: FormEventHandler, children: ReactNode, isDisabled: boolean  }
) {
    return (
        <Modal>
            <ModalHeader modalName={title} closeButtonHandler={onClose}/>
            
            <ModalBody handleSubmit={onSubmit}>
                {children}

                <SaveButton isDisabled={isDisabled}/>
            </ModalBody>
        </Modal>
    );
}