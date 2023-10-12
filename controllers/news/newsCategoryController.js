const connection = require('../../database/connection');

module.exports = {
     //cadastra uma nova categoria
     newCategory(req, res) {
        const name = req.body.name;
        const description = req.body.description || '';

        const newCategory = `INSERT INTO newsCategory(
            name,
            description
            ) VALUES (
                '${name}',
                '${description}'
            )`;

        connection.query(newCategory, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir categoria', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    //retorna todos as categorias
    getCategories(req, res) {
        const selectCategories = `SELECT * FROM newsCategory ORDER BY name`;

        connection.query(selectCategories, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter categorias', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza a categoria
    updateCategory(req, res) {
        const id = parseInt(req.params.id);
        const name = req.body.name;
        const description = req.body.description || '';

        const updateCategory = 'UPDATE `newsCategory` SET `name`= ?,' +
            '`description`= ?' +
            'WHERE `newsCategory`.`ID`= ?';

        connection.query(updateCategory, 
            [
                name,
                description, 
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar categoria', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //delete uma categoria
    deleteCategory(req, res) {
        const id = parseInt(req.params.id);
        const deleteCategory = `DELETE FROM newsCategory WHERE ID = ?`;

        connection.query(deleteCategory, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir categoria', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}