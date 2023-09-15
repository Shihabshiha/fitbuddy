import React ,{useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addCourseValidationSchema } from '../../../validations/TrainerCommonValidation';
import { CourseData } from '../../../types/trainerTypes';
import { addNewCourse } from '../../../api/endpoints/trainer';
import { notify , ToastContainer } from '../../../utils/notificationUtils';
import { ScaleLoader } from 'react-spinners';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCoursePage: React.FC = () => {
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (values:CourseData) => {
    try {
      setIsLoading(true)
      // Create a new FormData object
      const formData = new FormData();
  
      // Append your form fields to the formData object
      formData.append('courseName', values.courseName);
      formData.append('description', values.description);
      formData.append('duration', values.duration.toString());
      formData.append('category', values.category);
      formData.append('level', values.level);
      formData.append('isPaid', values.isPaid.toString());
      for (let i = 0; i < values.thumbnail.length; i++) {
        formData.append('thumbnail', values.thumbnail[i]);
      }
      if (values.isPaid) {
        formData.append('price', String(values.price)); 
      }
      await addNewCourse(formData); 
      setIsLoading(false)
      notify("Course added successfully" , "success")
      navigate('/trainer/my-courses')
    } catch (error:unknown) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("An error occurred in adding the course.", "error");
      } 
    }
  };

  const initialValues: CourseData = {
    courseName: '',
    description: '',
    duration: 0,
    category: '',
    level: '',
    price: 0,
    isPaid: false,
    thumbnail: [],
  };
  

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-white">
            <ScaleLoader color="#007BFF" loading={true} />
          </div>
       )}
      <h2 className="text-2xl font-semibold mb-4">Add a New Course</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={addCourseValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue , values }) => (
          <Form className="flex flex-wrap -mx-4">
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                Course Name
              </label>
              <Field
                type="text"
                id="courseName"
                name="courseName"
                className="form-input"
              />
              <ErrorMessage name="courseName" component="div" className="text-red-500" />
            </div>
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="form-textarea h-16"
              />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
            {/* Add other form fields using the same structure */}
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (in hours)
              </label>
              <Field
                type="number"
                id="duration"
                name="duration"
                className="form-input"
              />
              <ErrorMessage name="duration" component="div" className="text-red-500" />
            </div>
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Field
                type="text"
                id="category"
                name="category"
                className="form-input"
              />
              <ErrorMessage name="category" component="div" className="text-red-500" />
            </div>
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Level
              </label>
              <Field
                type="text"
                id="level"
                name="level"
                className="form-input"
              />
              <ErrorMessage name="level" component="div" className="text-red-500" />
            </div>
            <div className="mb-4 px-4 w-1/2 flex items-center">
              <label htmlFor="isPaid" className="flex text-sm font-medium text-gray-700">
                Is Paid
              </label>
              <Field
                type="checkbox"
                id="isPaid"
                name="isPaid"
                className="form-checkbox ml-4"
              />
              <ErrorMessage name="isPaid" component="div" className="text-red-500" />
            </div>

            {values.isPaid && (
              <div className="mb-4 px-4 w-1/2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="form-input"
                />
                <ErrorMessage name="price" component="div" className="text-red-500" />
              </div>
            )}
            <div className="mb-4 px-4 w-1/2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                className="block"
                onChange={(event) => {
                  setFieldValue("thumbnail", event.currentTarget.files);
                }}
              />
            </div>
            <div className="block  w-full px-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add Course
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddCoursePage;
