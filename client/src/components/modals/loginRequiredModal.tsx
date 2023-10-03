import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom"; 


interface LoginRequiredModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

const LoginRequiredModal : React.FC<LoginRequiredModalProps> = ({ isOpen, onRequestClose , message }) => {
  const navigate = useNavigate(); 

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 w-11/12 max-w-md shadow-lg"
      overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
    >
      <div className="p-2">
        <p className="text-lg mb-4">
          {message}
        </p>
        <div className="pt-2 md:p-4 flex justify-end gap-2 md:gap-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={redirectToLogin}
          >
            Go to Login
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;
