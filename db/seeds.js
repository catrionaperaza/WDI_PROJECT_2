const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

const Place = require('../models/place');
const User = require('../models/user');

Place.collection.drop();
User.collection.drop();

User
  .create([{
    email: 'odwyercatriona@gmail.com',
    username: 'odwyercatriona',
    password: 'password',
    image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAKDAAAAJDliNmVlNDk1LTg1YmYtNDlkNi04OTBlLThkNmI3Yjk0ZGFlMQ.jpg'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Place
      .create([{
        name: 'Sydney',
        image: 'https://wallscover.com/images/sydney-2.jpg',
        whoWith: 'My best friend Laura',
        whyThoughts: 'I always wanted to visit Sydney and see the Opera House!',
        status: 'Been'
      },{
        name: 'New York',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRuawxXHqDEkrBiwq6yuhApzQC3V6jgDK_-yxP4sryFiajrJ7_w',
        whoWith: 'My mom',
        whyThoughts: 'I really wanted to go shopping in New York and to see a musical!',
        status: 'Been'
      }]);
  })
  .then((places) => console.log(`${places.length} places been listings created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
