import multer from 'multer';
import path from 'path'

const publicDirectory = path.join(__dirname, "../../public")
const uploadDirectory = path.join(publicDirectory, 'uploads')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // adalah folder penyimpanan file yang diupload
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // membuat nama file unik: gabungan dari timestamp dan random number
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        ); // nama file yang diupload akan menjadi: fieldname-timestamp-random.ext (contoh: image-1615302206098-1234567890.jpg)
    },
})

export default multer({ storage })