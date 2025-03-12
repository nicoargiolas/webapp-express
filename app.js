const express = require('express');
const app = express();
// const cors = require("cors");
const port = process.env.PORT;

app.use(express.json());
// app.use(cors({ origin: 'http://localhost:5173' }));

// Importazione
// const posts = require('./data/posts');
const moviesRouter = require('./routers/movies-router');
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');

app.use(express.static('public'));

// Rotte
app.get('/', (req, res) => {
    res.send('Home');
});

app.use('/movies', moviesRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use(errorsHandler);
app.use(notFound);