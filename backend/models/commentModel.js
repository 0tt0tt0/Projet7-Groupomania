class comment{
    constructor(content){
        this.content = content;
    }
    save(connection) {
        const sql = "\
          INSERT INTO Comments (content)\
          VALUES (?);";
          const sqlParams = [this.content];
          
          // Envoi de la requete et réponse au frontend en fonction des erreurs SQL
          connection.execute(sql, sqlParams, (error, results, fields) => {
            if (error) { // Erreur SQL
                res.status(500).json({ "error": error.sqlMessage });
            } else { // Pas d'erreur : commentaire ajouté
              res.status(201).json({ message: 'Commentaire publié' });
            }
          });
        }
    }