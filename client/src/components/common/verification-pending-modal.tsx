import React from "react";
import Modal from "react-modal";

interface VerificationPendingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const VerificationPendingModal: React.FC<VerificationPendingModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Verification Pending Modal"
      className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Account Verification Pending</h2>
        <p className="text-gray-600 mb-4">
          Your account is pending verification.
        </p>
        <p className="text-gray-600 mb-4">
          You will receive an email notification once the verification process is completed.
        </p>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 focus:outline-none"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </Modal>

  );
};

export default VerificationPendingModal;
