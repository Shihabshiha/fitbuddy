// import multer from 'multer';


// const storage = multer.memoryStorage(); 

// const upload = multer({ storage }).single('certificates'); 

// export default upload;

// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: 'images/', // Set the destination folder for uploaded files
//   filename: (req, file, callback) => {
//     callback(null, file.originalname); // Set the filename as the original filename
//   }
// });

// const upload = multer({ storage }).single('certificates');

// export default upload;

import multer from 'multer';

const upload = multer().array("certificates", 10);

export default upload;



