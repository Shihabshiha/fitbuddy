
import React from 'react';
import Modal from 'react-modal';
import { TrainerDetails } from '../../types/trainerTypes';

interface CertificateModalProps {
  isOpen: boolean;
  certificates: string[];
  onRequestClose: () => void;
  selectedTrainer: TrainerDetails | null; 
  selectedCertificateIndex: number | null;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  certificates,
  onRequestClose,
  selectedTrainer,
  selectedCertificateIndex,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Certificate Modal"
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg"
      overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
    >
      <div className="modal-content">
        <h2 className="modal-title text-2xl font-bold mb-4">Certificates</h2>
        {selectedTrainer && selectedCertificateIndex !== null && (
          <div className="certificate-container">
            <div className="certificate bg-gray-100 p-4 rounded-lg shadow">
              <img
                src={certificates[selectedCertificateIndex]}
                alt={`Certificate ${selectedCertificateIndex + 1}`}
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
        <button
          className="modal-close-button bg-gray-500 text-white mt-4 px-4 py-2 rounded"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CertificateModal;
