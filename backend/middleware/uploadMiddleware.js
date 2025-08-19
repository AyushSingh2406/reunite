const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'reunite-app',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'tiff', 'webp' , 'svg'], // 👈 added webp
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});


const upload = multer({ storage: storage });

module.exports = upload;