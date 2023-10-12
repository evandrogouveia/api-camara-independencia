const connection = require('../database/connection');

module.exports = {
    //cadastra dados da transparencia
    newTransparency(req, res) {
        const title = req.body.title || '';
        const subTitle = req.body.subTitle || '';
        const description = req.body.description || '';
        const section1 = req.body.section1 || '';
        const section2 = req.body.section2 || '';
        const section3 = req.body.section3 || '';
        const section4 = req.body.section4 || '';
        const section5 = req.body.section5 || '';

        const newTransparency = `INSERT INTO transparency(
        title,
        subTitle,
        description, 
        section1,
        section2,
        section3,
        section4,
        section5
        ) VALUES (
            '${title}',
            '${subTitle}', 
            '${description}', 
            '${JSON.stringify(section1)}',
            '${JSON.stringify(section2)}',
            '${JSON.stringify(section3)}',
            '${JSON.stringify(section4)}',
            '${JSON.stringify(section5)}'
            
        )`;

        connection.query(newTransparency, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao cadastrar dados', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    //retorna dados da transparencia
    getTransparency(req, res) {
        const selectTransparency = `SELECT * FROM transparency`;

        connection.query(selectTransparency, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter dados', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza dados da transparencia
    updateTransparency(req, res) {
        const id = parseInt(req.params.id);
        const title = req.body.title;
        const subTitle = req.body.subTitle;
        const description = req.body.description;
        const section1 = req.body.section1;
        const section2 = req.body.section2;
        const section3 = req.body.section3;
        const section4 = req.body.section4;
        const section5 = req.body.section5;
       
        const updateRoles = 'UPDATE `transparency` SET `title`= ?,' +
            '`subTitle`= ?,' +
            '`description`= ?,' +
            '`section1`= ?,' +
            '`section2`= ?,' +
            '`section3`= ?,' +
            '`section4`= ?,' +
            '`section5`= ?' +
            'WHERE `transparency`.`ID`= ?';

        connection.query(updateRoles,
            [
                title,
                subTitle,
                description,
                JSON.stringify(section1),
                JSON.stringify(section2),
                JSON.stringify(section3),
                JSON.stringify(section4),
                JSON.stringify(section5),
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