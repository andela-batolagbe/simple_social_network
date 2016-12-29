# simple_social_network
A simple twitter like app. demo available at https://thesimplesocial.herokuapp.com

### How to run
#### The app uses [cloudinary](http://cloudinary.com/) file storage service to store user profile pictures, if you do not have a cloudinary account, you might need to create one before you can run app locally (account creation is free and comes with 1gb of free storage). 
#### Follow the steps below to run app locally.
- Clone repository
- Run npm install
- Create a .env file in root folder for environment variable configuration
- Add the following environment variables to your .env file.
  * NODE_ENV= (optional, default to development)
  * DB= mongodb database url
  * CLOUDINARY_NAME= cloudinary account cloud name
  * CLOUDINARY_KEY= cloudinary account api key
  * CLOUDINARY_SECRET= cloudinary account api secret
  * PORT= (app port, optional, default to 5000)
  
