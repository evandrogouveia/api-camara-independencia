const connection = require('../../database/connection');

module.exports = {
    //cadastra um novo video
    newVideo(req, res) {
        const title = req.body.title;
        const link = req.body.link;

        const newVideo = `INSERT INTO videos(
            title,
            link
            ) VALUES (
                '${title}',
                '${link}'
            )`;

        connection.query(newVideo, [], function (error, resultsRegister, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao inserir vídeo', error: error });
            } else {
                res.status(200).json({ status: 1, message: 'sucesso!' });
            }
        });
    },

    //retorna todos os videos
    getVideos(req, res) {
        const selectVideos = `SELECT * FROM videos ORDER BY ID DESC`;

        connection.query(selectVideos, [], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao obter vídeos', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    },

    //atualiza o vídeo
    updateVideo(req, res) {
        const id = parseInt(req.params.id);
        const title = req.body.title;
        const link = req.body.link;

        const updateVideo = 'UPDATE `videos` SET `title`= ?,' +
            '`link`= ?' +
            'WHERE `videos`.`ID`= ?';

        connection.query(updateVideo, 
            [
                title, 
                link,
                id
            ], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro atualizar vídeo', error: error });
            } else {
                res.status(200).json(results);
            }
        });

    },

    //deletar vídeo
    deleteVideo(req, res) {
        const id = parseInt(req.params.id);
        const deleteVideo = `DELETE FROM videos WHERE ID = ?`;

        connection.query(deleteVideo, [id], function (error, results, fields) {
            if (error) {
                res.status(400).json({ status: 0, message: 'Erro ao excluir vídeo', error: error });
            } else {
                res.status(200).json(results);
            }
        });
    }
}