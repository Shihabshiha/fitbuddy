import config from './config/config';
import { Application } from 'express';
import connectDatabase from './config/mongooseConnection';
import setupSocketIO from './socket';

export const startServer = async (app: Application) => {
  try {
    await connectDatabase();
    const port = config.PORT || 5000;
    const server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    }); 
    setupSocketIO(server)
  } catch (error: any) {
    console.error('Error starting server:', error.message);
  }
};
