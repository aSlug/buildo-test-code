import express from 'express';
import morgan from 'morgan';
import * as routes from './routes/routes';

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes.router);

app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log( `Server started at http://localhost:${ port }` );
});
