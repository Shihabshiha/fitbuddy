import { BeatLoader } from 'react-spinners';
import React, { useState } from 'react';
import { listUnlist } from '../../api/endpoints/trainer';
import { Course } from '../../types/courseType';
import ReactModal from 'react-modal';
import { notify , ToastContainer} from '../../utils/notificationUtils';

interface ListUnlistButtonProps {
  course: Course;
  onUpdateCourse: (updatedCourse: Course) => void;
}

const ListUnlistButton: React.FC<ListUnlistButtonProps> = ({ course, onUpdateCourse }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmation = async () => {
    setIsModalOpen(false)
    try {
      setLoading(true);
      const updatedCourse = await listUnlist(course._id, !course.isListed)
      onUpdateCourse(updatedCourse.data);
      setLoading(false);
    } catch (error) {
      notify("An error occured during list/unlist","error")
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={()=>setIsModalOpen(true)}
        className={`${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : course.isListed
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-green-500 hover:bg-green-600'
        } text-white px-4 py-1 rounded-md focus:outline-none focus:ring focus:ring-blue-300`}
        disabled={loading}
      >
        {loading ? <BeatLoader size={8} color="white" /> : course.isListed ? 'Unlist' : 'List'}
      </button>
      
      <ToastContainer />

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-30 bg-gray-900"
      >
        <h2 className="text-xl font-semibold mb-4">
          Confirm {course.isListed ? 'Unlisting' : 'Listing'}?
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to {course.isListed ? 'unlist' : 'list'} this course?
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleConfirmation}
            className={`${
              course.isListed
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

export default ListUnlistButton;
