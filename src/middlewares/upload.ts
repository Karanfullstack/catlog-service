import multer from 'multer';
import { v4 as uuid } from 'uuid';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, uuid());
    },
});
export const upload = multer({ storage });
