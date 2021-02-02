import express from 'express';
import './config/dbConnection';
import {config} from 'dotenv';

const app: any = express();
const port: number = 4000;

app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
    try {
        return console.log(`server is listening on ${port}`);
    } catch (error) {
        return console.log(error)
    }
});