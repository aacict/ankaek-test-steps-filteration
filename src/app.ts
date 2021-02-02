import express from 'express';
import './config/dbConnection';
import router from './middlewares/routerIndex'
const app: any = express();
const port: number = 4000;

app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(express.json());

// Routes setup
const apiRoutes: any = router();
app.use('/', apiRoutes);

app.listen(port, () => {
    try {
        return console.log(`server is listening on ${port}`);
    } catch (error) {
        return console.log(error)
    }
});