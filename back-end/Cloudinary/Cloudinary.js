const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,     
  api_secret: process.env.API_SECRET
});


const storage=new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Employee', // Specify the folder name in Cloudinary
    formats: 'jpg'|| 'jpeg' || 'png', // Specify allowed file types
  },
});



module.exports = {cloudinary,storage,};