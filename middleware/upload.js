const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    switch (file.fieldname) {
      case "avatar":
        folder = "avatars";
        break;
      case "postThumb":
        folder = "posts";
        break;
      default:
        folder = "others";
    }
    const aspectRatio = file.width / file.height;
    let transformations;

    if (aspectRatio > 3 / 4) {
      // Ширше, ніж 3:4
      transformations = [
        { height: 640, crop: "fill" }, // Базовий розмір
        { height: 1280, crop: "fill" }, // Ретіна версія
      ];
    } else {
      // Вужче, ніж 3:4 або рівне 3:4
      transformations = [
        { height: 640, crop: "fill" }, // Базовий розмір
        { height: 1280, crop: "fill" }, // Ретіна версія
      ];
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: file.originalname,
      transformation: transformations,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
