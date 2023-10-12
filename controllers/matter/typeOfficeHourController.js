const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de expediente
    newTypeOfficeHour(req, res) {
        const description = req.body.description || '';
        const category = req.body.category || '';
        const readingVoting = req.body.readingVoting || '';
        const tribuneTime = req.body.tribuneTime || '';
        const timeApart = req.body.timeApart || '';
        const auxiliaryTitle = req.body.auxiliaryTitle || '';
        const regiment = req.body.regiment || '';

        const newTypeOfficeHour = `INSERT INTO typeofficehour(
            description,
            category,
            readingVoting,
            tribuneTime,
            timeApart,
            auxiliaryTitle,
            regiment
            ) VALUES (
                '${description}',
                '${category}', 
                '${readingVoting}', 
                '${tribuneTime}',
                '${timeApart}',
                '${auxiliaryTitle}',
                '${regiment}'
            )`;

        connection.query(newTypeOfficeHour, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de expediente
     getAllTypeOfficeHour(req, res) {
        const selectTypeOfficeHour = `SELECT * FROM typeofficehour ORDER BY description`;

        connection.query(selectTypeOfficeHour, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de expediente
    updateTypeOfficeHour(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';
        const category = req.body.category || '';
        const readingVoting = req.body.readingVoting || '';
        const tribuneTime = req.body.tribuneTime || '';
        const timeApart = req.body.timeApart || '';
        const auxiliaryTitle = req.body.auxiliaryTitle || '';
        const regiment = req.body.regiment || '';

        const updateTypeOfficeHour = 'UPDATE `typeofficehour` SET `description`= ?,' +
        '`category`= ?,' +
        '`readingVoting`= ?,' +
        '`tribuneTime`= ?,' +
        '`timeApart`= ?,' +
        '`auxiliaryTitle`= ?,' +
        '`regiment`= ?' +
        'WHERE `typeofficehour`.`ID`= ?';

        connection.query(updateTypeOfficeHour, 
            [
                description, 
                category,
                readingVoting,
                tribuneTime,
                timeApart,
                auxiliaryTitle,
                regiment,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete um tipo de expediente
    deleteTypeOfficeHour(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypeOfficeHour = `DELETE FROM typeofficehour WHERE ID = ?`;

        connection.query(deleteTypeOfficeHour, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de expediente', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}