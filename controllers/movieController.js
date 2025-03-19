import connection from '../data/db.js';

function index(req, res) {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'server Error INDEX function',
            });

        // res.json(results); //versione senza img dinamica

        //mappiamo movies aggiungendo dinamicamente all'imagePath la stringa movie.image
        const movies = results.map((movie) => {
            return {
                ...movie,
                image: req.imagePath + movie.image,
            }
        });

        //salviamo la risposta json in movies
        res.json(movies);

    });
}

function show(req, res) {

    const { id } = req.params;

    const movieSql = 'SELECT * FROM movies WHERE id= ?';

    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    connection.query(movieSql, [id], (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'server Error SHOW function',
            });

        if (results.length === 0)
            return res.status(404).json({
                error: 'Movie not found',
            });

        const movie = results[0];

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err)
                return res.status(500).json({
                    error: 'server Error SHOW function',
                });

            movie.reviews = reviewsResults;
            // res.json(movie);

            res.json({
                ...movie,
                image: req.imagePath + movie.image,
            })
        });
    });
}

// function destroy(req, res) {
//     const { id } = req.params;

//     const sql = 'DELETE FROM movie WHERE id = ?';

//     connection.query(sql, [id], (err) => {
//         if (err)
//             return res.status(500).json({
//                 error: 'server Error DESTROY function',
//             });

//         res.sendStatus(204);
//     });
// }

function storeReview(req, res) {

    //recuparare l'id
    const { id } = req.params;

    //recuparare le informazioni del body
    const { text, name, vote } = req.body;

    //preparazione della query
    const reviewSql =
        'INSERT INTO reviews ( text, name, vote, movie_id ) VALUES (?,?,?,?)';

    //eseguiamo la query
    connection.query(reviewSql, [text, name, vote, id], (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Database Errore StoreReview',
            });

        res.status(201);
        res.json({
            message: 'review Added',
            id: results.insertId,
        });
    });
}

export { index, show, storeReview };