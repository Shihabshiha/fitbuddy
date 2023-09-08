
import multer from 'multer';

const uploadThumbnail = multer().array("thumbnail",1);

export default uploadThumbnail;
