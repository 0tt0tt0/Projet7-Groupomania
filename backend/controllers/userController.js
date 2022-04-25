const bcrypt = require('bcrypt');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const connection = require('../config/database');
const query = require('../config/database');


//Création d'un compte en sécurisant le mdp grâce à bcrypt

exports.signup = async (req, res, next) => {
    let newUser;
    let hash = await bcrypt.hash(req.body.password, 10);

    newUser = new user (req.body.pseudo, req.body.email, hash);
        
    console.log (newUser.pseudo);
    console.log (newUser.email);
    await createUser(newUser);
}   
async function createUser(newUser) {
    const sql = "\
        INSERT INTO Users (pseudo, email, password)\
        VALUES (?, ?, ?);";
        const sqlParams = [newUser.pseudo, newUser.email, newUser.password];
            
        // Envoi de la requete et réponse au frontend en fonction des erreurs SQL
        const result = await query (sql, sqlParams);
} 
        

/*//Connexion, vérification de l'email et du hash du mdp, initialisation du token
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.SECRET,
                    { expiresIn: '24h' }
                  )
            });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };*/