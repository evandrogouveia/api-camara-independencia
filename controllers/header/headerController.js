const connection = require('../../database/connection');
const multer = require('multer');
let fs = require('fs-extra');

module.exports = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            let path = `./uploads/header`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path); //gera o diretório automaticamente
            }
            cb(null, path);
        },
        filename: function (req, files, cb) {
            cb(null, `${Date.now()}-${files.originalname}`);
        }
    }),

    registerHeader(req, res) {
        let logo;
        let background;

        if (req.files.logo) { logo = `${process.env.BASE_URL}/uploads/header/${req.files.logo[0]?.filename}`; }
        if (req.files.background) { background = `${process.env.BASE_URL}/uploads/header/${req.files.background[0]?.filename}`; }

        const newHeader = `INSERT INTO header(
            logo,
            background
            ) VALUES (
                '${logo}',
                '${background}'
            )`;

        connection.query(newHeader, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'dados cadastrado!' });
            }
        });

    },

    geHeader(req, res) {
        const selectHeader = `SELECT * FROM header`;

        connection.query(selectHeader, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    updateHeader(req, res) {
        const id = parseInt(req.params.id);
        let dataForm = JSON.parse(req.body.formHeader);

        let logo;
        let background;
      
        req.files.logo ? logo = `${process.env.BASE_URL}/uploads/header/${req.files.logo[0]?.filename}` : logo = dataForm.logo;
        req.files.background ? background = `${process.env.BASE_URL}/uploads/header/${req.files.background[0]?.filename}` : background = dataForm.background;

        const updateHeader = 'UPDATE `header` SET `logo`= ?,' +
            '`background`= ?' +
            'WHERE `header`.`ID`= ?';

        connection.query(updateHeader, [
            logo,
            background,
            id
        ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao atualizar dados', error: error });
            } else {
                res.status(200).json({ status: 0, message: 'Dados atualizado!' });
            }
        });
    }
}