const connection = require('../../database/connection');

module.exports = {
    //cadastra um novo cargo
    newRole(req, res) {
        const description = req.body.description;
        const symbology = req.body.symbology || '';
        const exerciseSchedule = req.body.exerciseSchedule || '';
        const serviceLocation = req.body.serviceLocation || '';
        const jobAttributes = req.body.jobAttributes || '';

        const newRole = `INSERT INTO roles(
            description,
            symbology, 
            exerciseSchedule,
            serviceLocation,
            jobAttributes
            ) VALUES (
                '${description}',
                '${symbology}', 
                '${exerciseSchedule}', 
                '${serviceLocation}',
                '${jobAttributes}'
            )`;

        connection.query(newRole, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir cargo', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    //retorna todos os cargos
    getRoles(req, res) {
        const selectRoles = `SELECT * FROM roles ORDER BY description`;

        connection.query(selectRoles, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter cargos', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o cargo
    updateRole(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.description;
        const symbology = req.body.symbology;
        const exerciseSchedule = req.body.exerciseSchedule;
        const serviceLocation = req.body.serviceLocation;
        const jobAttributes = req.body.jobAttributes;

        const updateRoles = 'UPDATE `roles` SET `description`= ?,' +
            '`symbology`= ?,' +
            '`exerciseSchedule`= ?,' +
            '`serviceLocation`= ?,' +
            '`jobAttributes`= ?' +
            'WHERE `roles`.`ID`= ?';

        connection.query(updateRoles, 
            [
                description, 
                symbology,
                exerciseSchedule,
                serviceLocation,
                jobAttributes,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar o cargo', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete um cargo
    deleteRole(req, res) {
        const id = parseInt(req.params.id);
        const deleteRole = `DELETE FROM roles WHERE ID = ?`;

        connection.query(deleteRole, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir cargo', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}