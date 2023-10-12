const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de publicação
    newTypePublication(req, res) {
        const description = req.body.description || '';
        const acronym = req.body.acronym || '';
        const quantity = req.body.quantity || '';
        const category = req.body.category || '';
        const characteristic = req.body.characteristic || '';

        const newTypePublication = `INSERT INTO typepublication(
            description,
            acronym,
            quantity,
            category,
            characteristic
            ) VALUES (
                '${description}',
                '${acronym}', 
                '${quantity}', 
                '${category}',
                '${characteristic}'
            )`;

        connection.query(newTypePublication, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de publicação
     getAllTypePublication(req, res) {
        const selectTypePublication = `SELECT * FROM typepublication ORDER BY description`;

        connection.query(selectTypePublication, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de publicação
    updateTypePublication(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';
        const acronym = req.body.acronym || '';
        const quantity = req.body.quantity || '';
        const category = req.body.category || '';
        const characteristic = req.body.characteristic || '';

        const updateTypePublication = 'UPDATE `typepublication` SET `description`= ?,' +
        '`acronym`= ?,' +
        '`quantity`= ?,' +
        '`category`= ?,' +
        '`characteristic`= ?' +
        'WHERE `typepublication`.`ID`= ?';

        connection.query(updateTypePublication, 
            [
                description, 
                acronym,
                quantity,
                category,
                characteristic,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete um tipo de publicação
    deleteTypePublication(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypePublication = `DELETE FROM typepublication WHERE ID = ?`;

        connection.query(deleteTypePublication, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de publicação', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}