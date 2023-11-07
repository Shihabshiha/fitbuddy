import express from 'express';
import { startServer } from './startServer';
import routes from './routes/index'
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express()

app.use(bodyParser.json());
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(routes)
startServer(app);
