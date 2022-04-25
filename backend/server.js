import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

// Setup Express
const app = express();
const port = process.env.PORT || 3000;

// Setup JSON parsing for the request body
app.use(express.json());

// Setup our API routes.
import api from './routes';
app.use('/api', api);

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make all files in that folder public
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

// Connect to the database.
// Once connected, the "then" function will be called, which will start the app listening for client connections.
// Once THAT happens, then the message "App server listening..." will be displayed in the console.
//app.listen(port, () => console.log(`App server listening on port ${port}!`));
mongoose.connect('mongodb://localhost:27017/gamebox')
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));