require('dotenv').config(); //Dotenv nous permet de cacher certains elements dans un fichier gitignore (et ainsi ne pas donner nos mots de passes)

const express = require("express");
const cors = require('cors')
const helmet = require('helmet')
const db = require('./config/database');
const path = require('path'); //Module node qui sert à cacher notre addresse Mongo (marche avec dotenv)
const userRoutes = require('./routes/user'); //Notre router utilisateur


/*********************************************************************************/
//On ce connect sur notre database

db.authenticate()
    .then(() => { console.log('OK...')})
    .catch(err => console.log('error' + err))

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

app.use('/images', express.static(path.join(__dirname, 'images'))); //On indique le dossier pour multer

//app.use('/api/posts', sauceRoutes)
app.use('/api/auth', userRoutes);

module.exports = app