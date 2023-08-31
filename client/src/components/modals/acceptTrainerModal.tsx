import React from 'react';
import Modal from 'react-modal';

interface AcceptanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string; // Add a title prop
  message: string; // Add a message prop
}

Modal.setAppElement('#root'); 

const AcceptanceModal: React.FC<AcceptanceModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg"
      overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg  p-4 max-w-md mx-auto ">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="ml-2 px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AcceptanceModal;
