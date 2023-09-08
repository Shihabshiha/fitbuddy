import * as Yup from 'yup';

export const addCourseValidationSchema = Yup.object({
  courseName: Yup.string().required('Course Name is required'),
  description: Yup.string().required('Description is required'),
  thumbnail: Yup.mixed().required('Course Thumbnail is required'),
  duration: Yup.number()
    .required('Duration is required')
    .min(0, 'Duration must be greater than or equal to 0'),
  category: Yup.string().required('Category is required'),
  level: Yup.string().required('Level is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be greater than or equal to 0'),
  isPaid: Yup.boolean().required('Please indicate if the course is paid or not.'),
});