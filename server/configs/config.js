'use strict';

module.exports = {
  database: process.env.DB,
  secret: process.env.SESSION_SECRET,
  jwtSecretKey: process.env.JWT_SECRET,
  cloudinary: {
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
  },
  baseUrl: process.env.BASE_URL
};
