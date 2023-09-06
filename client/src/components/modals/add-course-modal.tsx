import React from 'react';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import { addCourseValidationSchema } from '../../validations/TrainerCommonValidation';
import { AddCourseModalProps } from '../../types/trainerTypes';


Modal.setAppElement('#root'); 

const validationSchema = addCourseValidationSchema;

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onRequestClose,
  onAddCourse,
}) => {
  const formik = useFormik({
    initialValues: {
      courseName: '',
      description: '',
      thumbnail: null,
      duration: 0, 
      category: '',
      level: '',
      price: 0,
      isPaid: false,
    },
    validationSchema,
    onSubmit: (values) => {
      // Pass the new course data to the parent component
      onAddCourse(values);
      // Close the modal
      onRequestClose();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-4/5 max-w-3xl shadow-lg"
      overlayClassName="modal-overlay fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add a New Course</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-wrap -mx-4">
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formik.values.courseName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.courseName && formik.errors.courseName ? (
              <div className="text-red-500">{formik.errors.courseName}</div>
            ) : null}
          </div>
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-textarea h-16" 
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (in hours)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.duration && formik.errors.duration ? (
              <div className="text-red-500">{formik.errors.duration}</div>
            ) : null}
          </div>
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500">{formik.errors.category}</div>
            ) : null}
          </div>
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Level
            </label>
            <input
              type="text"
              id="level"
              name="level"
              value={formik.values.level}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.level && formik.errors.level ? (
              <div className="text-red-500">{formik.errors.level}</div>
            ) : null}
          </div>
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500">{formik.errors.price}</div>
            ) : null}
          </div>
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="isPaid" className="block text-sm font-medium text-gray-700">
              Is Paid
            </label>
            <input
              type="checkbox"
              id="isPaid"
              name="isPaid"
              checked={formik.values.isPaid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-checkbox"
            />
            {formik.touched.isPaid && formik.errors.isPaid ? (
              <div className="text-red-500">{formik.errors.isPaid}</div>
            ) : null}
          </div>
          <div className="mb-4 px-4 w-1/2">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
              Course Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={(event) => {
                const selectedFile = event.currentTarget.files ? event.currentTarget.files[0] : null;
                formik.setFieldValue('thumbnail', selectedFile);
              }}
              onBlur={formik.handleBlur}
              className="form-input"
            />
            {formik.touched.thumbnail && formik.errors.thumbnail ? (
              <div className="text-red-500">{formik.errors.thumbnail}</div>
            ) : null}
          </div>
          {/* Add more fields in a similar manner */}
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="ml-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );  
};

export default AddCourseModal;
