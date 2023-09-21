import { BeatLoader } from 'react-spinners';
import React, { useState } from 'react';
import { blockUnblock } from '../../api/endpoints/admin';
import { userDetails } from '../../types/userType'
import ReactModal from 'react-modal';
import { notify , ToastContainer} from '../../utils/notificationUtils';
import { Button } from "@material-tailwind/react";

interface BlockUnblockButtonProps {
  user: userDetails;
  onBlockUnblockUser: (updatedUser: userDetails) => void;
}

const BlockUnblockButton: React.FC<BlockUnblockButtonProps> = ({ user, onBlockUnblockUser }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmation = async () => {
    setIsModalOpen(false)
    try {
      setLoading(true);
      const result = await blockUnblock(user._id,!user.isBlocked)
      onBlockUnblockUser(result.data.updatedUser);
      setLoading(false);
    } catch (error) {
      notify("An error occured during list/unlist","error")
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        color={loading ? "gray" : user.isBlocked ? "green" : "red"}
        ripple={false}
        className="text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        disabled={loading}
      >
        {loading ? <BeatLoader size={8} color="white" /> : user.isBlocked ? 'Unblock' : 'Block'}
      </Button>
      
      <ToastContainer />

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-30 bg-gray-900"
      >
        <h2 className="text-xl font-semibold mb-4">
          Confirm {user.isBlocked ? 'Unblock' : 'block'}?
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to {user.isBlocked ? 'unblock' : 'block'} , {user.firstName}?
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleConfirmation}
            className={`${
              user.isBlocked
                ? 'bg-red-500 hover:bg-red-700'
                : 'bg-green-500 hover:bg-green-700'
            } text-white font-semibold px-2 py-1 rounded mr-2`}
          >
            Confirm
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-2 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default BlockUnblockButton;
