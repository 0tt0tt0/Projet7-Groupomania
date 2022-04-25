class post{
    constructor(content, imageUrl){
        this.content = content;
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        this.imageUrl = imageUrl;
    }
    save(connection) {
        const sql = "\
          INSERT INTO Posts (content, imageUrl)\
          VALUES (?, ?);";
          const sqlParams = [this.content, this.imageUrl];
          
          // Envoi de la requete et réponse au frontend en fonction des erreurs SQL
          connection.execute(sql, sqlParams, (error, results, fields) => {
            if (error) { // Erreur SQL
                res.status(500).json({ "error": error.sqlMessage });
            } else { // Pas d'erreur : utilisateur ajouté
              res.status(201).json({ message: 'Post publié' });
            }
          });
        }
    }