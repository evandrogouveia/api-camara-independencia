const connection = require('../../database/connection');

module.exports = {
     //cadastra um novo partido
     newParty(req, res) {
        const acronym = req.body.acronym;
        const description = req.body.description || '';

        const newParty = `INSERT INTO parties(
            acronym,
            description
            ) VALUES (
                '${acronym}',
                '${description}'
            )`;

        connection.query(newParty, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir partido', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    //retorna todos as partidos
    getParties(req, res) {
        const selectParties = `SELECT * FROM parties ORDER BY acronym`;

        connection.query(selectParties, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter partidos', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o partido
    updateParty(req, res) {
        const id = parseInt(req.params.id);
        const acronym = req.body.acronym;
        const description = req.body.description || '';

        const updateParty = 'UPDATE `parties` SET `acronym`= ?,' +
            '`description`= ?' +
            'WHERE `parties`.`ID`= ?';

        connection.query(updateParty, 
            [
                acronym,
                description, 
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar partido', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //deleta um partido
    deleteParty(req, res) {
        const id = parseInt(req.params.id);
        const deleteParty = `DELETE FROM parties WHERE ID = ?`;

        connection.query(deleteParty, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir partido', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}