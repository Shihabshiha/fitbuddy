import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ChapterData } from '../../../types/courseType';
import { addChapterValidationSchema } from '../../../validations/TrainerCommonValidation';
import { notify, ToastContainer } from '../../../utils/notificationUtils';
import { ScaleLoader } from 'react-spinners';
import { AxiosError } from 'axios';
import { useParams , useNavigate , useLocation} from 'react-router-dom'; 
import { addNewChapter } from '../../../api/endpoints/trainer';


const AddChapterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate()
  const location = useLocation()
  const courseData = location.state.course;
  const handleSubmit = async (values: ChapterData) => {
    try {
      setIsLoading(true);

      // Create a new FormData object
      const formData = new FormData();
      formData.append('caption', values.caption);
      formData.append('order', values.order.toString());
      formData.append('description',values.description)
      if(values.videoFile){
        formData.append('videoFile',values.videoFile[0]); 
      }
      // Make an API call to add a new chapter to the course with the video file
      if(courseId){  
        await addNewChapter( formData , courseId);
        setIsLoading(false);
        notify('Chapter added successfully', 'success');
        navigate(`/trainer/course/${courseId}`,{ state : {course : courseData}})
      }else{
        notify('Error in adding chapter',"error")
      }
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, 'error');
      } else {
        notify('An error occurred in adding the chapter.', 'error');
      }
    }
  };

  const initialValues: ChapterData = {
    caption: '',
    description: '',
    order: 0,
    videoFile: [],
  };


  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
          <ScaleLoader color="#007BFF" loading={true} />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">Add Chapters</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={addChapterValidationSchema}
        onSubmit= {handleSubmit}
      >
        {({  setFieldValue }) => (
          <Form className="flex flex-wrap -mx-4">
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                Caption for Video
              </label>
              <Field type="text" id="caption" name="caption" className="form-input" />
              <ErrorMessage name="caption" component="div" className="text-red-500" />
            </div>
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="description" className="flex text-sm font-medium text-gray-700">
                Description
              </label>
              <Field type="text" id="description" name="description" className="form-textarea h-16" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                Order
              </label>
              <Field type="number" id="order" name="order" className="form-input" />
              <ErrorMessage name="order" component="div" className="text-red-500" />
            </div>
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700">
                Upload Video
              </label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept=".mp4, .avi, .mov" // Define accepted video file formats
                className="form-input"
                onChange={(event)=>{
                  if (event.currentTarget.files && event.currentTarget.files.length > 0) {
                    setFieldValue('videoFile', event.currentTarget.files);
                  }
                }}
              />
            </div>
            <div className="block w-full px-4 ">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Chapter
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddChapterPage;
