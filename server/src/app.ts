import express from 'express';
import { startServer } from './startServer';
import routes from './routes/index'
import logger from 'morgan';
import cors from 'cors';


const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(routes)
startServer(app);
