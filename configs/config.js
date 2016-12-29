'use strict';

module.exports = {
  database: process.env.DB,
  cloudinary: {
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
  }
};
