const connection = require('../../database/connection');

module.exports = {
    //cadastra novo tipo de fase
    newTypePhase(req, res) {
        const description = req.body.description || '';
        const withAgent = req.body.withAgent || '';
        const withComission = req.body.withComission || '';
        const withSession = req.body.withSession || '';
        const withReceiver = req.body.withReceiver || '';
        const withCraft = req.body.withCraft || '';
        const withMatter = req.body.withMatter || '';
        const withPublications = req.body.withPublications || '';
        const explanationText = req.body.explanationText || '';

        const newTypePhase = `INSERT INTO typephase(
            description,
            withAgent,
            withComission,
            withSession,
            withReceiver,
            withCraft,
            withMatter,
            withPublications,
            explanationText
            ) VALUES (
                '${description}',
                '${withAgent}', 
                '${withComission}', 
                '${withSession}',
                '${withReceiver}',
                '${withCraft}',
                '${withMatter}',
                '${withPublications}',
                '${explanationText}'
            )`;

        connection.query(newTypePhase, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

     //retorna todos os tipos de fase
     getAllTypePhase(req, res) {
        const selectTypePhase = `SELECT * FROM typephase ORDER BY description`;

        connection.query(selectTypePhase, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o tipo de fase
    updateTypePhase(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description || '';
        const withAgent = req.body.withAgent || '';
        const withComission = req.body.withComission || '';
        const withSession = req.body.withSession || '';
        const withReceiver = req.body.withReceiver || '';
        const withCraft = req.body.withCraft || '';
        const withMatter = req.body.withMatter || '';
        const withPublications = req.body.withPublications || '';
        const explanationText = req.body.explanationText || '';

        const updateTypePhase = 'UPDATE `typephase` SET `description`= ?,' +
        '`withAgent`= ?,' +
        '`withComission`= ?,' +
        '`withSession`= ?,' +
        '`withReceiver`= ?,' +
        '`withCraft`= ?,' +
        '`withMatter`= ?,' +
        '`withPublications`= ?,' +
        '`explanationText`= ?' +
        'WHERE `typephase`.`ID`= ?';

        connection.query(updateTypePhase, 
            [
                description, 
                withAgent,
                withComission,
                withSession,
                withReceiver,
                withCraft,
                withMatter,
                withPublications,
                explanationText,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete um tipo de fase
    deleteTypePhase(req, res) {
        const id = parseInt(req.params.id);
        const deleteTypePhase = `DELETE FROM typephase WHERE ID = ?`;

        connection.query(deleteTypePhase, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir tipo de fase', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }

}