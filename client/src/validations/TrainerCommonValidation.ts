import * as Yup from 'yup';

export const addCourseValidationSchema = Yup.object({
  courseName: Yup.string().required('Course Name is required'),
  description: Yup.string()
    .required('Description is required')
    .max(60 , 'Description must be at most 60 characters'),
  thumbnail: Yup.mixed().required('Course Thumbnail is required'),
  duration: Yup.number()
    .required('Duration is required')
    .min(0, 'Duration must be greater than or equal to 0'),
  about : Yup.string().required('about is required'),
  category: Yup.string().required('Category is required'),
  level: Yup.string().required('Level is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be greater than or equal to 0'),
  isPaid: Yup.boolean().required('Please indicate if the course is paid or not.'),
});

export const addChapterValidationSchema = Yup.object().shape({
  caption: Yup.string()
    .required('Caption is required')
    .max(100, 'Caption must be at most 100 characters'),
  order: Yup.number()
    .required('Order is required')
    .integer('Order must be an integer')
    .min(1, 'Order must be at least 1'),
  description: Yup.string()
    .required('Description is required')
    .max(100, 'Description must be at most 100 characters')
})