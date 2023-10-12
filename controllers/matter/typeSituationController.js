const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de situação
    newTypeSituation(req, res) {
        const description = req.body.description || '';

        const newTypeSituation= `INSERT INTO typesituation(description) VALUES ('${description}')`;

        connection.query(newTypeSituation, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de situação
     getAllTypeSituation(req, res) {
        const selectTypeSituation = `SELECT * FROM typesituation ORDER BY description`;

        connection.query(selectTypeSituation, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de situação
    updateTypeSituation(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';

        const updateTypeSituation = 'UPDATE `typesituation` SET `description`= ?' +
            'WHERE `typesituation`.`ID`= ?';

        connection.query(updateTypeSituation, 
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

    //delete um tipo de situação
    deleteTypeSituation(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypeSituation = `DELETE FROM typesituation WHERE ID = ?`;

        connection.query(deleteTypeSituation, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de situação', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}