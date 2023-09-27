const path = require('path')
const multer = require('multer')

// Define storage configuration
const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    cb(null, "IMAGE" + Date.now() + path.extname(file.originalname));
  },
});

// Create multer instance with the configured storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit, adjust as needed
})

// Middleware to handle file upload
const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (!req.file) {
      return next(); 
    }
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        console.log(err.code);
        return res.status(400).json({ error: 'Unexpected file upload' });
      }
    } else if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log("Am the file", req.file);
    next();
  });
};



module.exports = uploadImage;