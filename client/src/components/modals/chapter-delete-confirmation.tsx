import React ,{useState} from 'react';
import Modal from 'react-modal';
import { notify , ToastContainer } from '../../utils/notificationUtils';
import { AxiosError } from 'axios';
import { deleteChapterById } from '../../api/endpoints/trainer';
import { ScaleLoader } from 'react-spinners';

interface DeleteChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete:  (chapterId: string) => void;
  chapterIdToDelete: string | null;
}

const DeleteChapterModal: React.FC<DeleteChapterModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  chapterIdToDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleConfirmDelete = async () => {
    try {
      if (chapterIdToDelete) {
        setIsDeleting(true)
        await deleteChapterById(chapterIdToDelete)
        notify("Chapter deleted successfully.", "success");
        setIsDeleting(false) 
        onDelete(chapterIdToDelete)     
      }
    } catch (error) {
      setIsDeleting(false)
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occured in deleting the chapter.", "error");
      }
    }
  };



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation Modal"
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg"
      overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-4 max-w-md mx-auto text-center">
        <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this chapter?</p>
        <div className="flex justify-center">
        {isDeleting ? (
            <ScaleLoader color="#4A90E2" loading={true} />
          ) : (
            <>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none mr-2"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 focus:outline-none"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </Modal>   
  );
};

export default DeleteChapterModal;
