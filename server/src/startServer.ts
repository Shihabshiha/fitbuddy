
import { Application } from 'express';
import connectDatabase from './config/mongooseConnection';

export const startServer = async (app: Application) => {
  try {
    await connectDatabase();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error: any) {
    console.error('Error starting server:', error.message);
  }
};
