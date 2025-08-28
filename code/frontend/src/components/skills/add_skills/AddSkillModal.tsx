import StandardModal from "../../common/modal/StandardModal";

export default function AddSkillModal({ closeButtonHandler }: { closeButtonHandler: () => void }) {
    return (
        <StandardModal
            title={"Add New Skill"}
            onClose={closeButtonHandler}
            onSubmit={() => {}}
            isDisabled={false}
        >
            <div></div>
        </StandardModal>
    );
}