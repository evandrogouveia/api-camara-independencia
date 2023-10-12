const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de sessão
    newTypeSession(req, res) {
        const description = req.body.description || '';

        const newTypeSession= `INSERT INTO typesession(description) VALUES ('${description}')`;

        connection.query(newTypeSession, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de sessões
     getAllTypeSession(req, res) {
        const selectTypeSession = `SELECT * FROM typesession ORDER BY description`;

        connection.query(selectTypeSession, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de sessão
    updateTypeSession(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';

        const updateTypeSession = 'UPDATE `typesession` SET `description`= ?' +
            'WHERE `typesession`.`ID`= ?';

        connection.query(updateTypeSession, 
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

    //delete um tipo de sessão
    deleteTypeSession(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypeSession = `DELETE FROM typesession WHERE ID = ?`;

        connection.query(deleteTypeSession, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de session', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}