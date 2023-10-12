const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de votação
    newTypeVote(req, res) {
        const description = req.body.description || '';

        const newTypeVote= `INSERT INTO typevote(description) VALUES ('${description}')`;

        connection.query(newTypeVote, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de votações
     getAllTypeVoce(req, res) {
        const selectTypeVote = `SELECT * FROM typevote ORDER BY description`;

        connection.query(selectTypeVote, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de votação
    updateTypeVote(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';

        const updateTypeVote = 'UPDATE `typevote` SET `description`= ?' +
            'WHERE `typevote`.`ID`= ?';

        connection.query(updateTypeVote, 
            [
                description, 
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete um tipo de votação
    deleteTypeVote(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypeVote = `DELETE FROM typevote WHERE ID = ?`;

        connection.query(deleteTypeVote, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de votação', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}