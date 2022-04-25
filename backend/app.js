const express = require('express');
const { json } = require('express');
const app = express();

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

//Bloc pour autoriser les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}); 

//Ajout d'un chemin statique
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

//Définition de la route principale pour users
const userRoutes = require('./routes/userRoute');
app.use('/api/auth', userRoutes);

/*//Définition de la route principale pour posts 
const postRoutes = require('./routes/postRoute');
app.use('/api/post', postRoutes);

//Définition de la route principale pour comments 
const commentRoutes = require('./routes/commentRoute');
app.use('/api/comment', commentRoutes);*/





module.exports = app;