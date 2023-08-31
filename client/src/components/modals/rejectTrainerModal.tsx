import React, { useState } from 'react';
import Modal from 'react-modal';
import { notify } from '../../utils/notificationUtils';

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
  title: string;
}

const RejectionModal: React.FC<RejectionModalProps> = ({ isOpen, onClose, onReject, title }) => {
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const handleReject = () => {
    if (rejectionReason.trim() === '') {
      notify('Please provide a reason for rejection.', 'error');
    } else {
      onReject(rejectionReason); 
      setRejectionReason(''); 
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg"
      overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          className="w-full h-24 p-2 border rounded mb-4"
          placeholder="Enter reason for rejection..."
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleReject}
            className="ml-2 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none"
          >
            Reject
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectionModal;
