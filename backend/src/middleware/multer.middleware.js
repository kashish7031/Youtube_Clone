import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save files to the public/temp folder temporarily
    // Make sure you create a 'public/temp' folder in your backend root!
    cb(null, "./public/temp"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ 
    storage, 
});