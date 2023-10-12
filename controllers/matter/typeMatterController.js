const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de matéria
    newTypeMatter(req, res) {
        const description = req.body.description || '';
        const acronym = req.body.acronym || '';
        const hasVote = req.body.hasVote || '';
        const typeVote = req.body.typeVote || '';
        const president = req.body.president || '';
        const alderman = req.body.alderman || '';
        const boardDirectors = req.body.boardDirectors || '';
        const commissions = req.body.commissions || '';
        const executive = req.body.executive || '';
        const popularInitiative = req.body.popularInitiative || '';
        const others = req.body.others || '';
        const hasRecipient = req.body.hasRecipient || '';
        const hasProcessing = req.body.hasProcessing || '';
        const hasEmendamentType = req.body.hasEmendamentType || '';
        const hasBindings = req.body.hasBindings || '';
        const initialBody = req.body.initialBody || '';
        const explanatory = req.body.explanatory || '';

        const newTypeMatter = `INSERT INTO typematter(
            description,
            acronym,
            hasVote,
            typeVote,
            president,
            alderman,
            boardDirectors,
            commissions,
            executive,
            popularInitiative,
            others,
            hasRecipient,
            hasProcessing,
            hasEmendamentType,
            hasBindings,
            initialBody,
            explanatory
            ) VALUES (
                '${description}',
                '${acronym}', 
                '${hasVote}', 
                '${typeVote}',
                '${president}',
                '${alderman}',
                '${boardDirectors}',
                '${commissions}',
                '${executive}',
                '${popularInitiative}',
                '${others}',
                '${hasRecipient}',
                '${hasProcessing}',
                '${hasEmendamentType}',
                '${hasBindings}',
                '${initialBody}',
                '${explanatory}'
            )`;

        connection.query(newTypeMatter, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de matéria
     getAllTypeMatter(req, res) {
        const selectTypeMatter = `SELECT * FROM typematter ORDER BY description`;

        connection.query(selectTypeMatter, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de matéria
    updateTypeMatter(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';
        const acronym = req.body.acronym || '';
        const hasVote = req.body.hasVote || '';
        const typeVote = req.body.typeVote || '';
        const president = req.body.president || '';
        const alderman = req.body.alderman || '';
        const boardDirectors = req.body.boardDirectors || '';
        const commissions = req.body.commissions || '';
        const executive = req.body.executive || '';
        const popularInitiative = req.body.popularInitiative || '';
        const others = req.body.others || '';
        const hasRecipient = req.body.hasRecipient || '';
        const hasProcessing = req.body.hasProcessing || '';
        const hasEmendamentType = req.body.hasEmendamentType || '';
        const hasBindings = req.body.hasBindings || '';
        const initialBody = req.body.initialBody || '';
        const explanatory = req.body.explanatory || '';

        const updateTypeMatter = 'UPDATE `typematter` SET `description`= ?,' +
        '`acronym`= ?,' +
        '`hasVote`= ?,' +
        '`typeVote`= ?,' +
        '`president`= ?,' +
        '`alderman`= ?,' +
        '`boardDirectors`= ?,' +
        '`commissions`= ?,' +
        '`executive`= ?,' +
        '`popularInitiative`= ?,' +
        '`others`= ?,' +
        '`hasRecipient`= ?,' +
        '`hasProcessing`= ?,' +
        '`hasEmendamentType`= ?,' +
        '`hasBindings`= ?,' +
        '`initialBody`= ?,' +
        '`explanatory`= ?' +
        'WHERE `typematter`.`ID`= ?';

        connection.query(updateTypeMatter, 
            [
                description, 
                acronym,
                hasVote,
                typeVote,
                president,
                alderman,
                boardDirectors,
                commissions,
                executive,
                popularInitiative,
                others,
                hasRecipient,
                hasProcessing,
                hasEmendamentType,
                hasBindings,
                initialBody,
                explanatory,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete um tipo de matéria
    deleteTypeMatter(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypeMatter = `DELETE FROM typematter WHERE ID = ?`;

        connection.query(deleteTypeMatter, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de matéria', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}