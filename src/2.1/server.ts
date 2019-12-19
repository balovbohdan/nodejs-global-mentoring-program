import * as express from 'express';

const app = express();

app.use(express.json());

app.get('/user', (req, res) => {
    res.send('hello world there');
});

app.listen(3000);
