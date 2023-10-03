// import React from 'react';
// import Modal from 'react-modal';

// const EnrolledSuccessModal : React.FC = ({ isOpen, onClose }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Enrolled Success Modal"
//       className="w-full max-w-md m-auto mt-20 p-6 rounded-lg bg-white shadow-lg"
//       overlayClassName="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50"
//     >
//       <div className="text-center">
//         <svg
//           className="text-green-400 w-16 h-16 mx-auto mb-4"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrolled Successfully</h2>
//         <p className="text-gray-600">Congratulations! You have successfully enrolled in the program.</p>
//         <button
//           onClick={onClose}
//           className="mt-6 px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-full focus:outline-none focus:ring focus:ring-green-300"
//         >
//           Close
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default EnrolledSuccessModal;

import React from 'react';
import Modal from 'react-modal';

const PaymentStatusModal : React.FC <{ isOpen: boolean; onClose: () => void; message: string }> = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Enrolled Modal"
      className="w-full max-w-md m-auto mt-25 p-6 rounded-lg bg-white shadow-lg"
      overlayClassName="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50"
    >
      <div className="text-center">
        {message === 'success' ? (
          <>
            <svg
              className="text-green-400 w-16 h-16 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrolled Successfully</h2>
            <p className="text-gray-600">Congratulations! You have successfully enrolled in the program.</p>
          </>
        ) : (
          <>
            <svg
              className="text-red-400 w-16 h-16 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Canceled</h2>
            <p className="text-gray-600">Your payment has been canceled.</p>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-full focus:outline-none focus:ring focus:ring-green-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PaymentStatusModal;

