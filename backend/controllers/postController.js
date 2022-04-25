const db = require('../config/db');
const fs = require('fs'); 



//Création d'un post
exports.createPost = (req, res, next) => {
    const connection = db.connect();

    const imageurl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const content = req.body.content ? req.body.content : null;

    const sql = "INSERT INTO posts (user_id, imageurl, content)\ VALUES (?, ?, ?);";
    const sqlParams = [userId, imageurl, content];

    connection.execute(sql, sqlParams, (error, results, fields) => {
        if (error) {
          res.status(500).json({ "error": error.sqlMessage });
        } else {
          res.status(201).json({ message: 'Publication ajoutée' });
        }
      });
      connection.end();
  }

//Affichage d'un post en fonction de son id
exports.displayOne = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

//Affichage de tous les posts
exports.displayAllPosts = (req, res, next) => {
    const imageurl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const content = req.body.content ? req.body.content : null;

    const sql = "SELECT 'id_user', `content`, `imageUrl` FROM posts;";
    const sqlParams = [id_user, imageurl, content];

    connection.execute(sql, sqlParams, (error, results, fields) => {
        if (error) {
          res.status(500).json({ "error": error.sqlMessage });
        } else {
          res.status(201).json({ message: 'Publication ajoutée' });
        }
      });
      connection.end();
  }
};

//Mise à jour d'un post avec ou sans image
exports.update = (req, res, next) => {
    const sauceObject = req.file ?
        {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
    };

//Suppression d'un post
exports.delete = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
        })
        .catch(error => res.status(500).json({ error }));
    };

//Ajout d'un like ou dislike, mise à jour des valeurs
exports.like = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            // nouvelles valeurs à modifier
            const newValues = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0,
            }
            // Différents cas:
            switch (like) {
                case 1:  // CAS: sauce liked
                    newValues.usersLiked.push(userId);
                    break;
                case -1:  // CAS: sauce disliked
                    newValues.usersDisliked.push(userId);
                    break;
                case 0:  // CAS: Annulation du like/dislike
                    if (newValues.usersLiked.includes(userId)) {
                        // si on annule le like
                        const index = newValues.usersLiked.indexOf(userId);
                        newValues.usersLiked.splice(index, 1);
                    } else {
                        // si on annule le dislike
                        const index = newValues.usersDisliked.indexOf(userId);
                        newValues.usersDisliked.splice(index, 1);
                    }
                    break;
            };
            // Calcul du nombre de likes / dislikes
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            // Mise à jour de la sauce avec les nouvelles valeurs
            Sauce.updateOne({ _id: sauceId }, newValues )
                .then(() => res.status(200).json({ message: 'Sauce notée !' }))
                .catch(error => res.status(400).json({ error }))  
        })
        .catch(error => res.status(500).json({ error }));
}