import multer from 'multer';

const storage = multer.memoryStorage(); // menyimpan file sementara di memory storage (RAM), sehingga tidak perlu menyimpan file di disk storage

export default multer({ storage })
