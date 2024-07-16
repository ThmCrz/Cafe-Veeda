import 'dotenv/config'; // enviroment

import cors from 'cors';
// dotenv.config();
import express from 'express'; // express js
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// routes
import routers from './src/routers/index.js';

const app = express();

const { APP_PORT } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json()); // body json
app.use(express.urlencoded({ extended: false })); // form-urlencoded

app.use(routers);
// using public folders
app.use(express.static(path.join(__dirname, '../FrontEnd/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/build/index.html'));
});

// start server with mongoose (mongodb module)
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongo DB Connected");
    app.listen(APP_PORT, () => {
      console.log(`Server is running at port ${APP_PORT}`);
    });
  })
  .catch((err) => console.log(err));

export default app;
