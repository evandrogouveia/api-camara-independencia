const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de emenda
    newTypeAmendment(req, res) {
        const description = req.body.description || '';

        const newTypeAmendment= `INSERT INTO typeamendment(description) VALUES ('${description}')`;

        connection.query(newTypeAmendment, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de emendas
     getAllTypeAmendment(req, res) {
        const selectTypeAmendment = `SELECT * FROM typeamendment ORDER BY description`;

        connection.query(selectTypeAmendment, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de emenda
    updateTypeAmendment(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';

        const updateTypeAmendment = 'UPDATE `typeamendment` SET `description`= ?' +
            'WHERE `typeamendment`.`ID`= ?';

        connection.query(updateTypeAmendment, 
            [
                description, 
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete um tipo de emenda
    deleteTypeAmendment(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypeAmendment = `DELETE FROM typeamendment WHERE ID = ?`;

        connection.query(deleteTypeAmendment, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de Amendment', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}