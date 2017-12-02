// Just simple mongo
const { MongoClient } = require('mongodb')
const mongoURL = "mongodb://localhost:27017/blog"


module.exports = (app) => {
  MongoClient.connect(mongoURL)
    .then((connection) => {
      app.blogs = connection.collection('blog')
      console.log("Database connection established.")
    }).catch((err) => console.log(err))
}
