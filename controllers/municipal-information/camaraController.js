const connection = require('../../database/connection');

module.exports = {
     //cadastra dados da câmara
     newCamara(req, res) {
        const name = req.body.name;
        const email = req.body.email || '';
        const phone = req.body.phone || '';
        const schedule = req.body.schedule || '';
        const plenary = req.body.plenary || '';
        const slogan = req.body.slogan || '';
        const qtdAlderman = req.body.qtdAlderman || '';
        const qtdPopulation = req.body.qtdPopulation || '';
        const address = req.body.address || '';
       
        const newCamara = `INSERT INTO camara(
            name,
            email,
            phone, 
            schedule ,
            plenary,
            slogan,
            qtdAlderman,
            qtdPopulation,
            address
            ) VALUES (
                '${name}',
                '${email}', 
                '${phone}', 
                '${schedule}',
                '${plenary}',
                '${slogan}',
                '${qtdAlderman}',
                '${qtdPopulation}',
                '${JSON.stringify(address)}'
            )`;

        connection.query(newCamara, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    //retorna dados da câmara
    getCamara(req, res) {
        const selectCamara = `SELECT * FROM camara`;

        connection.query(selectCamara, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza dados da câmara
    updateCamara(req, res) {
        const id = parseInt(req.params.id);
        const name = req.body.name || '';
        const email = req.body.email || '';
        const phone = req.body.phone || '';
        const schedule = req.body.schedule || '';
        const plenary = req.body.plenary || '';
        const slogan = req.body.slogan || '';
        const qtdAlderman = req.body.qtdAlderman || '';
        const qtdPopulation = req.body.qtdPopulation || '';
        const address = req.body.address || '';

        const updateRoles = 'UPDATE `camara` SET `name`= ?,' +
            '`email`= ?,' +
            '`phone`= ?,' +
            '`schedule`= ?,' +
            '`plenary`= ?,' +
            '`slogan`= ?,' +
            '`qtdAlderman`= ?,' +
            '`qtdPopulation`= ?,' +
            '`address`= ?' +
            'WHERE `camara`.`ID`= ?';

        connection.query(updateRoles, 
            [
                name, 
                email,
                phone,
                schedule,
                plenary,
                slogan,
                qtdAlderman,
                qtdPopulation,
                JSON.stringify(address),
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },
}