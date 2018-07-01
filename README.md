# Hackathon

Dashboard test project.

https://hackathon-test-proj.herokuapp.com

### Installing


```
git clone https://github.com/shango44/hackathon
cd hackathon
npm install
```

### Prerequisites

##### 1. Database Setup
1. Create a MongoDB Database whichever way you like
(You can use MLab: https://mlab.com)
2. Create a database User
3. Create the following collections: 
* users
* images
* tasks

Once you've done that, go to _server/db.js_ and configure for your database.
```
mongoose.connect('mongodb://username:password@host:port/database');
```

##### 2. Cloudinary
For image uploading, cloudinary is used and needs to be configured in _server/controllers/ImageController.js_
```
// CLOUDINARY CONFIG
cloudinary.config({ 
  cloud_name: 'CLOUD_NAME', 
  api_key: 'API_KEY', 
  api_secret: 'API_SECRET' 
});
```
## Run
##### Development
Execute:
```
npm run dev
```
##### Production
Build first
```
npm run build
```
Then execute
```
npm run prod
```



## Built With

* [React](https://reactjs.org/) - The web framework used
* [Redux](https://redux.js.org/) - State Management
* [MongoDB](https://www.mongodb.com/) - NoSQL Database
* [Express](https://expressjs.com/) - Backend framework

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/shango44/hackathon/LICENSE) file for details

## Acknowledgments
* rss-parser (https://github.com/bobby-brennan/rss-parser)
