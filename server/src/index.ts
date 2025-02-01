import app from './server';
import * as dotenv from 'dotenv';

dotenv.config();


app.listen(process.env.PORT, () => {
  console.log(`hello on http://localhost:${process.env.PORT}`);
});