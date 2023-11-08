import { notify, ToastContainer } from '../../utils/notificationUtils';
import React, { useState, useEffect } from 'react';
import CertificateModal from '../modals/certificateModal';
import RejectionModal from '../modals/rejectTrainerModal';
import { TrainerDetails } from '../../types/trainerTypes';
import { getTrainerVerificationList } from '../../api/endpoints/admin';
import AcceptanceModal from '../modals/acceptTrainerModal';
import { AxiosError } from 'axios';
import { sendRequestAcceptedMail } from '../../api/endpoints/admin';
import { sendRequestRejectedMail } from '../../api/endpoints/admin';
import TableSkeltonShimmer from '../shimmers/tableSkelton'


const PendingTrainersTable: React.FC = () => {
  const [pendingTrainers, setPendingTrainers] = useState<TrainerDetails[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerDetails | null>(null);
  const [selectedCertificateIndex, setSelectedCertificateIndex] = useState<number | null>(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedTrainerForAccept, setSelectedTrainerForAccept] = useState<TrainerDetails | null>(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedTrainerForRejection, setSelectedTrainerForRejection] = useState<TrainerDetails | null>(null);
  const [isLoading,setIsLoading] = useState(true)
  


  useEffect(() => {
    const fetchPendingTrainers = async () => {
      try {
        const response = await getTrainerVerificationList();
        setPendingTrainers(response.data.pendingList);
        setIsLoading(false)
      } catch (error:unknown) {
        setIsLoading(false)
        console.error("Error during fetching trainers data:", error);
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, "error");
        } else {
          notify("An error occured in fetching trainers data.", "error"); 
        }
      }
    };
    fetchPendingTrainers();
  }, []);

  const openCertificateModal = (trainer: TrainerDetails, certificateIndex: number) => {
    setSelectedTrainer(trainer);
    setSelectedCertificateIndex(certificateIndex);
  };

  const closeCertificateModal = () => {
    setSelectedTrainer(null);
    setSelectedCertificateIndex(null);
  };

  const handleAcceptClick = (trainer: TrainerDetails) => {
    setSelectedTrainerForAccept(trainer);
    setShowAcceptModal(true);
  };

  const handleRejectClick = (trainer: TrainerDetails) => {
    setSelectedTrainerForRejection(trainer);
    setShowRejectionModal(true);
  };

  

  const handleAcceptConfirmation = async () => {
    try{
      setIsLoading(true)
      if (selectedTrainerForAccept?.email) {
        
        await sendRequestAcceptedMail(selectedTrainerForAccept.email);
        
        notify("Request accepted and send mail successfully","success")
        setPendingTrainers(prevTrainers =>
          prevTrainers.filter(trainer => trainer._id !== selectedTrainerForAccept?._id)
        );
        setIsLoading(false)
        setShowAcceptModal(false);
      } else {
        setIsLoading(false)
        notify("Email address not available for selected trainer.", "error")
        setShowAcceptModal(false);
      }
    }catch(error:unknown){
      setIsLoading(false)
      console.error("Error during sending mail:", error);
        if (error instanceof AxiosError && error.response?.data?.error) {
          notify(error.response.data.error, "error");
        } else {
          notify("An error during sending mail.", "error");
        }
    } 
  }

  const handleRejectConfirmation = async (reason: string) => {
    try {
      setIsLoading(true)
      if (selectedTrainerForRejection?.email) {
        await sendRequestRejectedMail(selectedTrainerForRejection.email, reason);
        notify("Trainer rejected and mail sent successfully", "success");
        setPendingTrainers(prevTrainers =>
          prevTrainers.filter(trainer => trainer._id !== selectedTrainerForRejection?._id)
        );
        setIsLoading(false)
        setShowRejectionModal(false);
      } else {
        setIsLoading(false)
        notify("Email address not available for selected trainer.", "error");
        setShowRejectionModal(false);
      }
    } catch (error: unknown) {
      setIsLoading(false)
      console.error("Error during sending rejection mail:", error);
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error during sending rejection mail.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Pending Trainer Verification</h1>
      {isLoading ? (
        <>
          <TableSkeltonShimmer />
        </>
      ):(

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-start">Trainer Full Name</th>
            <th className="py-2 px-4 text-start">Email</th>
            <th className="py-2 px-4 text-start">Certificates</th>
            <th className="py-2 px-4 text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTrainers.map((trainer) => (
            <tr key={trainer._id} className="border-t">
              <td className="py-2 px-4 text-start">{`${trainer.firstName} ${trainer.lastName}`}</td>
              <td className="py-2 px-4 text-start">{trainer.email}</td>
              <td className="py-2 px-4 text-start">
                {trainer.certificates.map((_certificate, index) => (
                  <div
                    key={index}
                    onClick={() => openCertificateModal(trainer, index)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Certificate {index + 1}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 text-start">
                <button
                  className="middle none center mr-4 rounded-lg bg-green-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  onClick={() => handleAcceptClick(trainer)}
                >
                  Accept
                </button>
                <button
                  className="middle none center mr-4 rounded-lg bg-red-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  onClick={() => handleRejectClick(trainer)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>  
      )}
      <CertificateModal
        isOpen={selectedTrainer !== null}
        certificates={selectedTrainer?.certificates || []}
        selectedTrainer={selectedTrainer} 
        selectedCertificateIndex={selectedCertificateIndex} 
        onRequestClose={closeCertificateModal}
      />
      <AcceptanceModal
        isOpen={showAcceptModal}
        title="Accept Trainer"
        message={`Are you sure you want to accept ${selectedTrainerForAccept?.firstName} ${selectedTrainerForAccept?.lastName}?`}
        onConfirm={handleAcceptConfirmation} 
        onClose={() => setShowAcceptModal(false)}
      />
      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onReject={handleRejectConfirmation}
        title="Reject Trainer"
      />
      <ToastContainer />
    </div>
  );
};

export default PendingTrainersTable;



