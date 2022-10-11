import multer from 'multer';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, process.env.BASE_URL + file.originalname)
  }
});

export const upload = multer({ storage: storage });