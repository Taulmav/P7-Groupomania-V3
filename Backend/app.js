require('dotenv').config(); //Dotenv nous permet de cacher certains elements dans un fichier gitignore (et ainsi ne pas donner nos mots de passes)

const express = require("express");
const cors = require('cors')
const helmet = require('helmet')
let morgan = require('morgan');
const db = require('./config/database');
const runSeeders = require('./seeders');
const path = require('path'); //Module node qui sert à cacher notre addresse Mongo (marche avec dotenv)
const authRoutes = require('./routes/auth'); //Notre router auth
const userRoutes = require('./routes/user'); //Notre router user
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments')
const {load} = require('./models/index')
const xss = require('xss-clean'); //Element de sécurité. Aide contre les attaques XSS.
const rateLimit = require("express-rate-limit"); //Element de sécurité. contrôle le débit de requêttes.

/*********************************************************************************/
//On ce connect sur notre database

db.authenticate()
    load()
    .then(() => { console.log('OK...')})
    .catch(err => console.log('error' + err))


db.sync({force: process.env.NODE_ENV === "dev"}).then(() => {
  if(process.env.NODE_ENV === "dev") {
    runSeeders();
  }
})
  .catch(err => console.log('error' + err));



/*********************************************************************************/
//On créer notre application

const app = express();

/*********************************************************************************/
//Vu que l'on a deux origines, on ajoute un middleware pour éviter les érreurs CORS
const corsOptions = {
  origin:'http://localhost:3001',
  credentials:true,
  optionSuccessStatus:'200'
}
app.use(cors(corsOptions))


/****************************************************************/
//Nos middlewares principaux.


app.use(express.json()); //Equivalent de bodyparser qui n'est plus utiliser.
app.use(express.urlencoded({
  extended: true
}));

app.use(helmet()); 
app.use(xss());
app.use(morgan('combined'))

app.use('/images', express.static(path.join(__dirname, 'images'))); //On indique le dossier pour multer

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);


app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})

module.exports = app