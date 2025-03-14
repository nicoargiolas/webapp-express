const connection = require('../data/db');

function index(req, res) {

    // query di richiesta film
    const moviesSql = "SELECT * FROM movies;";

    connection.query(moviesSql, (err, result) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });

        // versione mappata del risultato
        const movies = result.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        // se tutto funziona
        res.json(movies);
    });

}

function show(req, res) {

    // recuperiamo l'id dai params
    const { id } = req.params;

    // query di richiesta
    const detailMovie = "SELECT * FROM movies WHERE movies.id = ?";
    const reviewSql = "SELECT * FROM reviews WHERE movie_id = ?";

    // richiediamo i dati del singolo film
    connection.query(detailMovie, [id], (err, movieResult) => {
        // se la query non va a buon fine
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResult.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // se tutto funziona
        const movie = movieResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {
            // se la query non va a buon fine
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorniamo l'oggetto movie con le review ritornate
            movie.reviews = reviewResult;

            // aggiungiamo il valore path img da middleware
            movie.image = req.imagePath + movie.image;

            // ritorniamo l'oggetto completo
            res.json(movie);
        });
    });
}

function storeReview(req, res) {

    const { id } = req.params;

    // prendo i valori dal body
    const { text, name, vote } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });

}

module.exports = { index, show, storeReview }