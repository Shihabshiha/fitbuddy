import multer from 'multer';

const CertificatesUpload = multer().array("certificates", 10);

export default CertificatesUpload;



