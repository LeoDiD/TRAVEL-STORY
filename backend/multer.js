const multer = require("multer");
const path = require("path");

// Configure storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the original file extension
    },
});

// Define the file filter
const fileFilter = (req, file, cb) => { // Changed to 'fileFilter' (uppercase 'F')
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Only images are allowed"), false); // Reject the file
    }
};

// Create the multer upload instance
const upload = multer({ storage, fileFilter }); // Use 'fileFilter' here

// Export the upload middleware
module.exports = upload;