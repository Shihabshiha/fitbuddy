import React from 'react';
import Modal from 'react-modal';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void; 
  imagePreview: string | null;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  onSend,
  imagePreview,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Preview Modal"
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg"
      overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-4 max-w-md mx-auto text-center">
        <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
        {imagePreview && (
          <img src={imagePreview} alt="Image Preview" className="mb-4" />
        )}
        <div className="flex justify-center">
          <button
            onClick={onSend}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none mr-2"
          >
            Send
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImagePreviewModal;
